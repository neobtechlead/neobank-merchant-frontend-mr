import {fetcher} from "@/api/http";
import {downloadFile} from "@/utils/lib";

export async function listDisbursements(merchant?: string, authToken: string = '') {
    return await fetcher(`api/v1/merchants/${merchant}/transactions?type=DISBURSEMENT`, {
        headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
        },
    });
}

export async function disburse(type: string = 'single', authToken?: string, data?: object) {
    return await fetcher(`api/v1/merchants/${type}-disbursements`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
}

export async function downloadBulkDisbursementTemplate() {
    const response = await fetcher('api/v1/downloads/bulk-disbursement-template', {
        headers: {
            'Content-Disposition': 'attachment; filename=bulkDisbursementTemplate.xlsx',
            'Content-Type': 'application/octet-stream',
        },
    });

    await downloadFile(response, 'bulkDisbursementTemplate.csv')
}