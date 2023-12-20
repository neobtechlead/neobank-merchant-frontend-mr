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

export async function listScheduledPayments(merchant?: string, authToken: string = '') {
    return await fetcher(`api/v1/merchants/${merchant}/transactions?scheduled=true`, {
        headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
        },
    });
}

export async function disburse(type: string = 'single', authToken?: string, data?: object) {
    const formData = new FormData();

    if (data && typeof data === 'object') {
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value as string | Blob);
        });
    }

    return await fetcher(`api/v1/merchants/${type}-disbursements`, {
        method: 'POST',
        headers: {'Authorization': `Bearer ${authToken}`},
        body: formData
    });
}

export async function downloadBulkDisbursementTemplate(authToken: string = '') {
    const response = await fetcher('api/v1/files/download/bulk-disbursement-template', {
        headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Disposition': 'attachment; filename=bulkDisbursementTemplate.xlsx',
            'Content-Type': 'application/octet-stream',
        },
    });

    await downloadFile(response, 'bulk-disbursement-template.csv')
}