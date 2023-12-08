import {fetcher} from "@/api/http";
import {downloadFile} from "@/utils/lib";

export async function listDisbursements(merchant?: string) {
    return await fetcher(`api/v1/merchants/${merchant}/transactions?type=DISBURSEMENT`);
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