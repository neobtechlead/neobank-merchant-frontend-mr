/**
* Jenkins Pipepline Script for deploying NEOBANK-MERCHANT-FRONTEND to Kubernetes Cluster
* @Author Peter Yefi
* @Created June 9 2020
**/

node {
    def app
    try {
        stage('Clone repository') {
            /* Let's make sure we have the repository cloned to our workspace */

            checkout scm
            //Copy .env file from workspace to project
            sh 'cp ../cf-neobank-merchant-frontend.env .'
            sh 'mv cf-neobank-merchant-frontend.env  .env'
       
        }

        stage('Build image') {
            /**
            * Choose deployment environment variable for run command in dockerfile
            * based on branch triggering the build process
            */
            lock('Environment Tagging'){
                def run_environment = 'PROD'
       
                if (env.BRANCH_NAME == 'develop') {
                    run_environment = 'DEVELOP'
                } else if (env.BRANCH_NAME == 'demo'){
                    run_environment = 'DEMO'
                }
                /* This builds the actual image; synonymous to
                 * docker build on the command line 
                * Lock stage to prevent wrong tagging when multiple pipelines are built
                */
        
                app = docker.build("749165515165.dkr.ecr.us-east-2.amazonaws.com/cf-server", "--build-arg REACT_APP_ENVIRONMENT=${run_environment} .")
            }  
        }
        if (env.BRANCH_NAME == 'develop' || env.BRANCH_NAME == 'master' || env.BRANCH_NAME == 'demo'){
            stage('Push image') {
                /* Finally, we'll push the image with tag of the current build number
                * Pushing multiple tags is cheap, as all the layers are reused.
                 */
                lock("ImagePush"){
                    def tag = "merchant-frontend-prod-latest"
                    
                    if (env.BRANCH_NAME == 'demo'){
                        tag = "merchant-frontend-demo-latest"
                    } else if(env.BRANCH_NAME == 'develop'){
                        tag = "merchant-frontend-dev-latest"
                    }
                   
                    if (env.BRANCH_NAME == 'demo' || env.BRANCH_NAME == 'develop'){
                        sh "sed -i 's/IMAGE_TAG/${tag}/' src/cf-helm/values.yaml"
                    }
                    docker.withRegistry('https://749165515165.dkr.ecr.us-east-2.amazonaws.com', 'ecr:us-east-2:cf-aws-credentials') {                   
                        app.push(tag)
                    }
                }
                
            }
            def deploy_title = ''
            def ns = ''
            def url = ''
            def charts = ''
            
            switch(env.BRANCH_NAME) {
                case 'develop':
                    deploy_title = 'Staging'
                    ns = 'staging'
                    url = "apis-neobank-merchant-staging.completefarmer.com" 
                    charts ="./src/cf-helm/"
                break
                case 'master':
                    deploy_title = 'Production'
                    ns = 'production'
                    url = "apis-neobank-merchant-staging.completefarmer.comm"
                    charts = "./src/cf-helm/"
                break
                case 'demo':
                    deploy_title = 'Demo'
                    ns = 'demo'
                    url = "apis-neobank-merchant-staging.completefarmer.com"
                    charts ="./src/cf-helm/"
                break
            }

            stage("Deploy To ${deploy_title} Environment") {
                /**
                * Deploy to production or staging environment when the job is 
                * triggered by either master of dev branch
                */
                withCredentials([string(credentialsId: 'neobank-context', variable: 'NEOBANK_CONTEXT')]) {
                sh 'kubectl config use-context ${NEOBANK_CONTEXT}'
                sh 'helm lint ./src/cf-helm/'
                sh "helm upgrade --install --wait --timeout 360s --force neobank-merchant-frontend-prod-latest ${charts} -n=${ns}"
                slackSend(color: 'good', message: "merchant-frontend dashboard deployed at ${url}")

                office365ConnectorSend webhookUrl: "${env.TEAM_WEBHOOK}", status: 'Success', message: "Merhant-frontend  dashboard deployed at ${url}"
            }
        }
        }
    } catch(err){
        slackSend(color: '#F01717', message: "${err}")
        office365ConnectorSend webhookUrl: "${env.TEAM_WEBHOOK}", message: "${err}"
        error "Build Failed ${err}"

    } finally {
        if (env.BRANCH_NAME == 'develop' || env.BRANCH_NAME == 'master' || env.BRANCH_NAME == 'demo'){
                def envName = env.BRANCH_NAME == 'dev' ? 'staging' : 'production'
                if (env.BRANCH_NAME == 'demo') {
                    envName = 'testing'
                }
                if (currentBuild.currentResult == 'SUCCESS'){
                    jiraSendDeploymentInfo environmentId: "${envName}", environmentName: "${envName}", environmentType: "${envName}", state: "successful"
                }
            }
            //Remove dangling images
            sh 'docker system prune -f'
    }
    
    
    
}
