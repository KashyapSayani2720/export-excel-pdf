export const htmlContent = `<!DOCTYPE html
PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>
<html xmlns='http://www.w3.org/1999/xhtml' xml:lang='en' lang='en'>

<head>
<meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
<title>Accounting Voucher Display</title>
<meta name='author' content='TallyPrime' />
<style type='text/css'>
    .pagebreak {
        page-break-before: always;
    }

    /* page-break-after works, as well */

    * {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    #header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 10px 10px 10px;
    }

    #header .left,
    #header .right {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    #header .title {
        font-family: Arial, Helvetica, sans-serif;
        font-weight: bold;
        font-size: 25px;
    }

    #header .date {
        font-size: 10px;
        font-weight: bold;
        background-color: orange;
        border-radius: 30px;
        padding: 5px;
    }

    #viewer {
        background-color: white;
        display: flex;
        justify-content: center;
        flex-direction: column;
        width: 100%;
    }

    .persondetail.main {
        display: flex;
        justify-content: center;
        flex-direction: column;
        background-color: #e9ecef;
        margin: 10px;
        padding: 8px;
        border-radius: 8px;
        width: calc(100% - 20px);
    }

    table {
        border-collapse: collapse;
    }

    .persondetail.main table {
        table-layout: fixed;
        background-color: #fff;
        border-radius: 6px;
        margin: 5px 0px;
        padding: 40px 20px;
        font-size: small;
    }

    .persondetail.main table tr td {
        padding: 5px
    }

    .persondetail.main table tr td:nth-child(3) {
        max-width: 200px;
        word-wrap: break-word;

    }

    .persondetail.main table tr td:nth-child(2),
    .persondetail.main table tr td:nth-child(5) {
        font-weight: bold;
        word-wrap: break-word;

    }

    .billing {
        display: flex;
        justify-content: center;
        flex-direction: column;
        margin: 10px;
        padding: 0px 40px;
    }

    .billing table {
        table-layout: fixed;
        background-color: #fff;
        border-radius: 6px;
        margin: 5px 0px;
        padding: 10px;
        font-size: small;
        text-align: left;
    }

    .billing table thead {
        font-weight: 500;
        text-align: left;
    }

    .billing table td,
    .billing table thead th {
        border-bottom: 1px solid rgba(168, 168, 168, 0.371);
        padding: 10px 10px;
    }

    .billing th span {
        display: block;
        min-width: 50px;
    }

    .taxable-table {
        border: 1px dashed black;
        border-radius: 10px;
        margin: 10px 30px;
        margin-top: 40px;

    }

    .taxable-table table {
        width: 100%;

    }

    
      .taxable-table table tr,.taxable-table table th {
          border-bottom: 1px solid black
      }
      .taxable-table table tr:last-child {
          border-bottom: none
      }
      .taxable-table table tr td:nth-last-child(-n+2) ,.taxable-table table th:nth-last-child(-n+2)  {
          border-left: 1px solid black
      }

    .taxable-table table td,
    .taxable-table table th {
        text-align: right;
        padding: 10px;
    }

    .taxable-table table td:first-child {
        width: 400px;
    }

    .inner-table {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: safe;
    }

    .inner-table-head,
    .inner-table-body {
        display: flex;
        justify-content: end;
        align-items: end;
        gap: 10px;
    }

    .inner-table-head {
        font-size: small;
        font-weight: bold;
    }

    .declaration-box {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        margin-top: 20px;
        padding: 0px 50px;
    }

    .declaration-header {
        font-size: 14px;
        color: #8a9d96
    }

    .declaration-signature {
        background-color: orange;
        width: fit-content;
        padding: 2px 8px 4px 8px;
        border-radius: 40px;
    }

    .declaration-left-side {
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 400px;
    }

    .declaration-right-side {
        display: flex;
        flex-direction: column;
        gap: 20px;
        text-align: end;
        width: 300px;
    }

    .declaration-signature-box {
        display: flex;
        justify-content: flex-end;
    }

    .font-small {
        font-size: 11px;
    }

    .font-medium {
        font-size: 14px;
    }

    .text-left {
        text-align: left;
    }

    .text-right {
        text-align: right;
    }

    .color-blue {
        color: blue
    }
</style>
</head>

<body>
<div id="viewer">
    <div id="header">
        <div class="left">
            <div class="logo"><img src="" alt="Logo" srcset=""></div>
            <div class="title"><span>Tax Invoice</span></div>
            <div class="date"><span>25th Feb 2024</span></div>
        </div>
        <div class="right">
            <div class="icon download"><span>
                    <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M9.92183 5.01786H9.18902C9.02964 5.01786 8.87808 5.09442 8.78433 5.22567L6.32808 8.63192L5.21558 7.08817C5.12183 6.95848 4.97183 6.88036 4.81089 6.88036H4.07808C3.97652 6.88036 3.91714 6.99598 3.97652 7.07879L5.92339 9.77879C5.96938 9.84299 6.03001 9.89529 6.10026 9.93138C6.1705 9.96746 6.24833 9.98628 6.3273 9.98628C6.40627 9.98628 6.4841 9.96746 6.55434 9.93138C6.62458 9.89529 6.68521 9.84299 6.7312 9.77879L10.0218 5.21629C10.0828 5.13348 10.0234 5.01786 9.92183 5.01786Z"
                            fill="black" />
                        <path
                            d="M7 0.50272C3.13437 0.50272 0 3.6371 0 7.50272C0 11.3683 3.13437 14.5027 7 14.5027C10.8656 14.5027 14 11.3683 14 7.50272C14 3.6371 10.8656 0.50272 7 0.50272ZM7 13.3152C3.79063 13.3152 1.1875 10.7121 1.1875 7.50272C1.1875 4.29335 3.79063 1.69022 7 1.69022C10.2094 1.69022 12.8125 4.29335 12.8125 7.50272C12.8125 10.7121 10.2094 13.3152 7 13.3152Z"
                            fill="black" />
                    </svg>
                </span></div>
            <div class="icon print"><span>
                    <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M9.92183 5.01786H9.18902C9.02964 5.01786 8.87808 5.09442 8.78433 5.22567L6.32808 8.63192L5.21558 7.08817C5.12183 6.95848 4.97183 6.88036 4.81089 6.88036H4.07808C3.97652 6.88036 3.91714 6.99598 3.97652 7.07879L5.92339 9.77879C5.96938 9.84299 6.03001 9.89529 6.10026 9.93138C6.1705 9.96746 6.24833 9.98628 6.3273 9.98628C6.40627 9.98628 6.4841 9.96746 6.55434 9.93138C6.62458 9.89529 6.68521 9.84299 6.7312 9.77879L10.0218 5.21629C10.0828 5.13348 10.0234 5.01786 9.92183 5.01786Z"
                            fill="black" />
                        <path
                            d="M7 0.50272C3.13437 0.50272 0 3.6371 0 7.50272C0 11.3683 3.13437 14.5027 7 14.5027C10.8656 14.5027 14 11.3683 14 7.50272C14 3.6371 10.8656 0.50272 7 0.50272ZM7 13.3152C3.79063 13.3152 1.1875 10.7121 1.1875 7.50272C1.1875 4.29335 3.79063 1.69022 7 1.69022C10.2094 1.69022 12.8125 4.29335 12.8125 7.50272C12.8125 10.7121 10.2094 13.3152 7 13.3152Z"
                            fill="black" />
                    </svg>
                </span></div>
        </div>
    </div>
    <div class="persondetail main">
        <table>
            <tr>
                <td><span>

                        <svg width="14" height="15" viewBox="0 0 14 15" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M9.92183 5.01786H9.18902C9.02964 5.01786 8.87808 5.09442 8.78433 5.22567L6.32808 8.63192L5.21558 7.08817C5.12183 6.95848 4.97183 6.88036 4.81089 6.88036H4.07808C3.97652 6.88036 3.91714 6.99598 3.97652 7.07879L5.92339 9.77879C5.96938 9.84299 6.03001 9.89529 6.10026 9.93138C6.1705 9.96746 6.24833 9.98628 6.3273 9.98628C6.40627 9.98628 6.4841 9.96746 6.55434 9.93138C6.62458 9.89529 6.68521 9.84299 6.7312 9.77879L10.0218 5.21629C10.0828 5.13348 10.0234 5.01786 9.92183 5.01786Z"
                                fill="black" />
                            <path
                                d="M7 0.50272C3.13437 0.50272 0 3.6371 0 7.50272C0 11.3683 3.13437 14.5027 7 14.5027C10.8656 14.5027 14 11.3683 14 7.50272C14 3.6371 10.8656 0.50272 7 0.50272ZM7 13.3152C3.79063 13.3152 1.1875 10.7121 1.1875 7.50272C1.1875 4.29335 3.79063 1.69022 7 1.69022C10.2094 1.69022 12.8125 4.29335 12.8125 7.50272C12.8125 10.7121 10.2094 13.3152 7 13.3152Z"
                                fill="black" />
                        </svg>

                    </span></td>
                <td><span>Name</span></td>
                <td><span>HOBC IMPORT EXPORT PRIVATE LIMITED</span></td>
                <td><span></span></td>
                <td><span>Invoice No.</span></td>
                <td><span class="declaration-signature">AOM#1361</span></td>
            </tr>
            <tr>
                <td><span>
                        <svg width="14" height="15" viewBox="0 0 14 15" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M9.92183 5.01786H9.18902C9.02964 5.01786 8.87808 5.09442 8.78433 5.22567L6.32808 8.63192L5.21558 7.08817C5.12183 6.95848 4.97183 6.88036 4.81089 6.88036H4.07808C3.97652 6.88036 3.91714 6.99598 3.97652 7.07879L5.92339 9.77879C5.96938 9.84299 6.03001 9.89529 6.10026 9.93138C6.1705 9.96746 6.24833 9.98628 6.3273 9.98628C6.40627 9.98628 6.4841 9.96746 6.55434 9.93138C6.62458 9.89529 6.68521 9.84299 6.7312 9.77879L10.0218 5.21629C10.0828 5.13348 10.0234 5.01786 9.92183 5.01786Z"
                                fill="black" />
                            <path
                                d="M7 0.50272C3.13437 0.50272 0 3.6371 0 7.50272C0 11.3683 3.13437 14.5027 7 14.5027C10.8656 14.5027 14 11.3683 14 7.50272C14 3.6371 10.8656 0.50272 7 0.50272ZM7 13.3152C3.79063 13.3152 1.1875 10.7121 1.1875 7.50272C1.1875 4.29335 3.79063 1.69022 7 1.69022C10.2094 1.69022 12.8125 4.29335 12.8125 7.50272C12.8125 10.7121 10.2094 13.3152 7 13.3152Z"
                                fill="black" />
                        </svg>
                    </span></td>
                <td><span>Address</span></td>
                <td><span>7F, Snn Raj Pinnacle , ITPL Main Road Bengaluru</span></td>
                <td><span></span></td>
                <td><span>Buyer's Order No.</span></td>
                <td><span></span></td>
            </tr>
            <tr>
                <td><span>
                        <svg width="14" height="15" viewBox="0 0 14 15" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M9.92183 5.01786H9.18902C9.02964 5.01786 8.87808 5.09442 8.78433 5.22567L6.32808 8.63192L5.21558 7.08817C5.12183 6.95848 4.97183 6.88036 4.81089 6.88036H4.07808C3.97652 6.88036 3.91714 6.99598 3.97652 7.07879L5.92339 9.77879C5.96938 9.84299 6.03001 9.89529 6.10026 9.93138C6.1705 9.96746 6.24833 9.98628 6.3273 9.98628C6.40627 9.98628 6.4841 9.96746 6.55434 9.93138C6.62458 9.89529 6.68521 9.84299 6.7312 9.77879L10.0218 5.21629C10.0828 5.13348 10.0234 5.01786 9.92183 5.01786Z"
                                fill="black" />
                            <path
                                d="M7 0.50272C3.13437 0.50272 0 3.6371 0 7.50272C0 11.3683 3.13437 14.5027 7 14.5027C10.8656 14.5027 14 11.3683 14 7.50272C14 3.6371 10.8656 0.50272 7 0.50272ZM7 13.3152C3.79063 13.3152 1.1875 10.7121 1.1875 7.50272C1.1875 4.29335 3.79063 1.69022 7 1.69022C10.2094 1.69022 12.8125 4.29335 12.8125 7.50272C12.8125 10.7121 10.2094 13.3152 7 13.3152Z"
                                fill="black" />
                        </svg>
                    </span></td>
                <td><span>GSTIN/UIN</span></td>
                <td><span>29AAGCH3941L1Z6</span></td>
                <td><span></span></td>
                <td><span>Terms of Delivery</span></td>
                <td><span></span></td>
            </tr>
            <tr>
                <td><span>
                        <svg width="14" height="15" viewBox="0 0 14 15" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M9.92183 5.01786H9.18902C9.02964 5.01786 8.87808 5.09442 8.78433 5.22567L6.32808 8.63192L5.21558 7.08817C5.12183 6.95848 4.97183 6.88036 4.81089 6.88036H4.07808C3.97652 6.88036 3.91714 6.99598 3.97652 7.07879L5.92339 9.77879C5.96938 9.84299 6.03001 9.89529 6.10026 9.93138C6.1705 9.96746 6.24833 9.98628 6.3273 9.98628C6.40627 9.98628 6.4841 9.96746 6.55434 9.93138C6.62458 9.89529 6.68521 9.84299 6.7312 9.77879L10.0218 5.21629C10.0828 5.13348 10.0234 5.01786 9.92183 5.01786Z"
                                fill="black" />
                            <path
                                d="M7 0.50272C3.13437 0.50272 0 3.6371 0 7.50272C0 11.3683 3.13437 14.5027 7 14.5027C10.8656 14.5027 14 11.3683 14 7.50272C14 3.6371 10.8656 0.50272 7 0.50272ZM7 13.3152C3.79063 13.3152 1.1875 10.7121 1.1875 7.50272C1.1875 4.29335 3.79063 1.69022 7 1.69022C10.2094 1.69022 12.8125 4.29335 12.8125 7.50272C12.8125 10.7121 10.2094 13.3152 7 13.3152Z"
                                fill="black" />
                        </svg>
                    </span></td>
                <td><span>State Name </span></td>
                <td><span>Karnataka</span></td>
                <td><span></span></td>
                <td colspan="2" rowspan="2"><span></span></td>
            </tr>
            <tr>
                <td><span>
                        <svg width="14" height="15" viewBox="0 0 14 15" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M9.92183 5.01786H9.18902C9.02964 5.01786 8.87808 5.09442 8.78433 5.22567L6.32808 8.63192L5.21558 7.08817C5.12183 6.95848 4.97183 6.88036 4.81089 6.88036H4.07808C3.97652 6.88036 3.91714 6.99598 3.97652 7.07879L5.92339 9.77879C5.96938 9.84299 6.03001 9.89529 6.10026 9.93138C6.1705 9.96746 6.24833 9.98628 6.3273 9.98628C6.40627 9.98628 6.4841 9.96746 6.55434 9.93138C6.62458 9.89529 6.68521 9.84299 6.7312 9.77879L10.0218 5.21629C10.0828 5.13348 10.0234 5.01786 9.92183 5.01786Z"
                                fill="black" />
                            <path
                                d="M7 0.50272C3.13437 0.50272 0 3.6371 0 7.50272C0 11.3683 3.13437 14.5027 7 14.5027C10.8656 14.5027 14 11.3683 14 7.50272C14 3.6371 10.8656 0.50272 7 0.50272ZM7 13.3152C3.79063 13.3152 1.1875 10.7121 1.1875 7.50272C1.1875 4.29335 3.79063 1.69022 7 1.69022C10.2094 1.69022 12.8125 4.29335 12.8125 7.50272C12.8125 10.7121 10.2094 13.3152 7 13.3152Z"
                                fill="black" />
                        </svg>
                    </span></td>
                <td><span>Code</span></td>
                <td><span>29</span></td>
                <td><span></span></td>
            </tr>

        </table>
        <table>
            <tr>
                <td><span>
                        <svg width="14" height="15" viewBox="0 0 14 15" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M9.92183 5.01786H9.18902C9.02964 5.01786 8.87808 5.09442 8.78433 5.22567L6.32808 8.63192L5.21558 7.08817C5.12183 6.95848 4.97183 6.88036 4.81089 6.88036H4.07808C3.97652 6.88036 3.91714 6.99598 3.97652 7.07879L5.92339 9.77879C5.96938 9.84299 6.03001 9.89529 6.10026 9.93138C6.1705 9.96746 6.24833 9.98628 6.3273 9.98628C6.40627 9.98628 6.4841 9.96746 6.55434 9.93138C6.62458 9.89529 6.68521 9.84299 6.7312 9.77879L10.0218 5.21629C10.0828 5.13348 10.0234 5.01786 9.92183 5.01786Z"
                                fill="black" />
                            <path
                                d="M7 0.50272C3.13437 0.50272 0 3.6371 0 7.50272C0 11.3683 3.13437 14.5027 7 14.5027C10.8656 14.5027 14 11.3683 14 7.50272C14 3.6371 10.8656 0.50272 7 0.50272ZM7 13.3152C3.79063 13.3152 1.1875 10.7121 1.1875 7.50272C1.1875 4.29335 3.79063 1.69022 7 1.69022C10.2094 1.69022 12.8125 4.29335 12.8125 7.50272C12.8125 10.7121 10.2094 13.3152 7 13.3152Z"
                                fill="black" />
                        </svg>
                    </span></td>
                <td><span>Consignee</span></td>
                <td><span>Manish Asawa</span></td>
                <td><span><i class="fa-solid fa-user"></i></span></td>
                <td><span>Bill to /</span><span>Buyer</span></td>
                <td><span>Manish Asawa</span></td>
            </tr>
            <tr>
                <td><span>
                        <svg width="14" height="15" viewBox="0 0 14 15" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M9.92183 5.01786H9.18902C9.02964 5.01786 8.87808 5.09442 8.78433 5.22567L6.32808 8.63192L5.21558 7.08817C5.12183 6.95848 4.97183 6.88036 4.81089 6.88036H4.07808C3.97652 6.88036 3.91714 6.99598 3.97652 7.07879L5.92339 9.77879C5.96938 9.84299 6.03001 9.89529 6.10026 9.93138C6.1705 9.96746 6.24833 9.98628 6.3273 9.98628C6.40627 9.98628 6.4841 9.96746 6.55434 9.93138C6.62458 9.89529 6.68521 9.84299 6.7312 9.77879L10.0218 5.21629C10.0828 5.13348 10.0234 5.01786 9.92183 5.01786Z"
                                fill="black" />
                            <path
                                d="M7 0.50272C3.13437 0.50272 0 3.6371 0 7.50272C0 11.3683 3.13437 14.5027 7 14.5027C10.8656 14.5027 14 11.3683 14 7.50272C14 3.6371 10.8656 0.50272 7 0.50272ZM7 13.3152C3.79063 13.3152 1.1875 10.7121 1.1875 7.50272C1.1875 4.29335 3.79063 1.69022 7 1.69022C10.2094 1.69022 12.8125 4.29335 12.8125 7.50272C12.8125 10.7121 10.2094 13.3152 7 13.3152Z"
                                fill="black" />
                        </svg>
                    </span></td>
                <td><span>Address</span></td>
                <td><span>7F, Snn Raj Pinnacle , ITPL Main Road Bengaluru</span></td>
                <td><span>
                        <svg width="14" height="15" viewBox="0 0 14 15" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M9.92183 5.01786H9.18902C9.02964 5.01786 8.87808 5.09442 8.78433 5.22567L6.32808 8.63192L5.21558 7.08817C5.12183 6.95848 4.97183 6.88036 4.81089 6.88036H4.07808C3.97652 6.88036 3.91714 6.99598 3.97652 7.07879L5.92339 9.77879C5.96938 9.84299 6.03001 9.89529 6.10026 9.93138C6.1705 9.96746 6.24833 9.98628 6.3273 9.98628C6.40627 9.98628 6.4841 9.96746 6.55434 9.93138C6.62458 9.89529 6.68521 9.84299 6.7312 9.77879L10.0218 5.21629C10.0828 5.13348 10.0234 5.01786 9.92183 5.01786Z"
                                fill="black" />
                            <path
                                d="M7 0.50272C3.13437 0.50272 0 3.6371 0 7.50272C0 11.3683 3.13437 14.5027 7 14.5027C10.8656 14.5027 14 11.3683 14 7.50272C14 3.6371 10.8656 0.50272 7 0.50272ZM7 13.3152C3.79063 13.3152 1.1875 10.7121 1.1875 7.50272C1.1875 4.29335 3.79063 1.69022 7 1.69022C10.2094 1.69022 12.8125 4.29335 12.8125 7.50272C12.8125 10.7121 10.2094 13.3152 7 13.3152Z"
                                fill="black" />
                        </svg>
                    </span></td>
                <td><span>State Name</span></td>
                <td><span>Maharastra</span></td>
            </tr>
            <tr>
                <td><span>
                        <svg width="14" height="15" viewBox="0 0 14 15" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M9.92183 5.01786H9.18902C9.02964 5.01786 8.87808 5.09442 8.78433 5.22567L6.32808 8.63192L5.21558 7.08817C5.12183 6.95848 4.97183 6.88036 4.81089 6.88036H4.07808C3.97652 6.88036 3.91714 6.99598 3.97652 7.07879L5.92339 9.77879C5.96938 9.84299 6.03001 9.89529 6.10026 9.93138C6.1705 9.96746 6.24833 9.98628 6.3273 9.98628C6.40627 9.98628 6.4841 9.96746 6.55434 9.93138C6.62458 9.89529 6.68521 9.84299 6.7312 9.77879L10.0218 5.21629C10.0828 5.13348 10.0234 5.01786 9.92183 5.01786Z"
                                fill="black" />
                            <path
                                d="M7 0.50272C3.13437 0.50272 0 3.6371 0 7.50272C0 11.3683 3.13437 14.5027 7 14.5027C10.8656 14.5027 14 11.3683 14 7.50272C14 3.6371 10.8656 0.50272 7 0.50272ZM7 13.3152C3.79063 13.3152 1.1875 10.7121 1.1875 7.50272C1.1875 4.29335 3.79063 1.69022 7 1.69022C10.2094 1.69022 12.8125 4.29335 12.8125 7.50272C12.8125 10.7121 10.2094 13.3152 7 13.3152Z"
                                fill="black" />
                        </svg>
                    </span></td>
                <td><span>State Name</span></td>
                <td><span>Maharashtra</span></td>
                <td><span><i class="fa-solid fa-user"></i></span></td>
                <td><span>Code</span></td>
                <td><span>27</span></td>
            </tr>
            <tr>
                <td><span>
                        <svg width="14" height="15" viewBox="0 0 14 15" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M9.92183 5.01786H9.18902C9.02964 5.01786 8.87808 5.09442 8.78433 5.22567L6.32808 8.63192L5.21558 7.08817C5.12183 6.95848 4.97183 6.88036 4.81089 6.88036H4.07808C3.97652 6.88036 3.91714 6.99598 3.97652 7.07879L5.92339 9.77879C5.96938 9.84299 6.03001 9.89529 6.10026 9.93138C6.1705 9.96746 6.24833 9.98628 6.3273 9.98628C6.40627 9.98628 6.4841 9.96746 6.55434 9.93138C6.62458 9.89529 6.68521 9.84299 6.7312 9.77879L10.0218 5.21629C10.0828 5.13348 10.0234 5.01786 9.92183 5.01786Z"
                                fill="black" />
                            <path
                                d="M7 0.50272C3.13437 0.50272 0 3.6371 0 7.50272C0 11.3683 3.13437 14.5027 7 14.5027C10.8656 14.5027 14 11.3683 14 7.50272C14 3.6371 10.8656 0.50272 7 0.50272ZM7 13.3152C3.79063 13.3152 1.1875 10.7121 1.1875 7.50272C1.1875 4.29335 3.79063 1.69022 7 1.69022C10.2094 1.69022 12.8125 4.29335 12.8125 7.50272C12.8125 10.7121 10.2094 13.3152 7 13.3152Z"
                                fill="black" />
                        </svg>
                    </span></td>
                <td><span>Code</span></td>
                <td><span>Karnataka</span></td>
            </tr>
        </table>
    </div>
    <div class="billing">
        <table>
            <thead>
                <tr>
                    <th><span>SI No.</span></th>
                    <th class="20vw"><span>Description of Goods</span></th>
                    <th><span>HAS/SAC</span></th>
                    <th><span>Qty.</span></th>
                    <th><span>Rate</span></th>
                    <th><span>per</span></th>
                    <th><span>Disc. %</span></th>
                    <th><span>Amount</span></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><span>1</span></td>
                    <td><span class="font-small">Bange mens Genuine LEather Belt with Crocodile skin pattern Buckle
                            a House of Brands Company Design Zys&91_q38yns</span></td>
                    <td><span>71171100</span></td>
                    <td><span>1 NOS</span></td>
                    <td><span>$3923.30</span></td>
                    <td><span>NOS</span></td>
                    <td><span></span></td>
                    <td class="text-right"><span>$3923.30</span></td>
                </tr>
                <tr>
                    <td><span>1</span></td>
                    <td><span class="font-small">Bange mens Genuine LEather Belt with Crocodile skin pattern Buckle
                            a House of Brands Company Design Zys&91_q38yns</span></td>
                    <td><span>71171100</span></td>
                    <td><span>1 NOS</span></td>
                    <td><span>$3923.30</span></td>
                    <td><span>NOS</span></td>
                    <td><span></span></td>
                    <td class="text-right"><span>$3923.30</span></td>
                </tr>
                <tr>
                    <td><span>1</span></td>
                    <td><span class="font-small">Bange mens Genuine LEather Belt with Crocodile skin pattern Buckle
                            a House of Brands Company Design Zys&91_q38yns</span></td>
                    <td><span>71171100</span></td>
                    <td><span>1 NOS</span></td>
                    <td><span>$3923.30</span></td>
                    <td><span>NOS</span></td>
                    <td><span></span></td>
                    <td class="text-right"><span>$3923.30</span></td>
                </tr>
                <tr>
                    <td rowspan="3" colspan="5"><span></span></td>
                    <td><span>Subtotal</span></td>
                    <td></td>
                    <td class="text-right"><span>$1233</span></td>
                </tr>
                <tr>
                    <td><span>Discount</span></td>
                    <td></td>
                    <td class="text-right"><span>$1233</span></td>
                </tr>
                <tr>
                    <td><span>IGST</span></td>
                    <td></td>
                    <td class="text-right"><span>$1233</span></td>
                </tr>
                <tr>
                    <td colspan="3"></td>
                    <td><span>4 NOS</span></td>
                    <td></td>
                    <td><span>Total</span></td>
                    <td></td>
                    <td class="text-right"><span class="color-blue">$1233</span></td>
                </tr>
                <tr>
                    <td colspan="2"><span>Amount Chargeable (in words) E. & O.E</span></td>
                    <td colspan="6"><span class="color-blue">INR Eight Thousand One Hundred Seventy Four Only</span>
                    </td>
                </tr>
                <tr>
                    <td colspan="2"><span>Tax Amounts in words</span></td>
                    <td colspan="6"><span class="color-blue">INR Two Hundred Forty and Seventy paise Only</span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="pagebreak"> </div>
    <div class="taxable-table">
        <table>
            <thead>
                <th></th>
                <th class="font-medium">Taxable Value</th>
                <th class="font-medium">IGST</th>
                <th class="font-medium">Total Tax Amount</th>
            </thead>
            <tbody>

                <tr>
                    <td></td>
                    <td>₹2,223.30</td>
                    <td class="inner-table">
                        <div class="inner-table-head">
                            <div>Rate</div>
                            <div>Amount</div>
                        </div>
                        <div class="inner-table-body">
                            <div>3%</div>
                            <div>$66.70</div>
                        </div>
                    </td>
                    <td>₹66.70</td>
                </tr>
                <tr>
                    <td>Total</td>
                    <td><span class="color-blue">₹2,223.30</span></td>
                    <td><span class="color-blue">₹66.70</span></td>
                    <td><span class="color-blue">₹66.70</span></td>
                </tr>
            </tbody>
        </table>
    </div>
    <div>
        <div class="declaration-box">
            <div class="declaration-left-side">
                <div class="declaration-header">Declaration</div>
                <div class="declaration-content">We declare that this invoice shows the actual price of the goods
                    described and that all particulars are true and correct.
                </div>
            </div>
            <div class="declaration-right-side declaration-signature-box">
                <div>for <span>HOBC IMPORT EXPORT PRIVATE LIMITED</span>
                </div>
                <div class="declaration-signature-box">
                    <div class="declaration-signature">Authorised Signatory</div>
                </div>
            </div>
        </div>
    </div>
</div>
</body>

</html>`;