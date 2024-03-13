export const htmlContentEditor = (item, qr) => {
 
    console.log({ item });
  
    const grosTotal = Number(item["Gross Total"]);
    const cgst = Number(item.CGST);
    const sgst = Number(item.SGST);
    const igst = Number(item.IGST);
    const discount = Number(item.Discount);
    const rate = Number(item.Rate);
    const value = Number(item?.Value);
    const quantity = Number(item.Quantity.split(" ")[0]);
  
  
    let invoiceDetailTable = "";
  
    for(let i = 0; i < quantity; i++) {
        let color; // Define color variable inside the loop
        
        if(i % 2 === 0) {
            color = "#F8F9FA";
        } else {
            color = "white";
        }
  
        let discPer = ((Math.abs(discount) * 100)/(quantity*rate)).toFixed(2);
        let newRate = value/quantity;
        
        // Generate HTML with the correct background color
        const invoiceDataHtml = `<tr style="background-color: ${color};">
          <td style="text-align:center;"><span>${i+1}</span></td>
          <td style=""><span>Bange mens Genuine LEather Belt with Crocodile skin pattern Buckle
                  a House of Brands Company Design Zys&91_q38yns</span></td>
          <td style="padding-left:10px; text-align:end;"><span>71171100</span></td>
          <td style="padding-left:10px; text-align:end;"><span>1 NOS</span></td>
          <td style="padding-left:12px; text-align:end;"><span>₹${newRate}</span></td>
          <td style="padding-left:12px; text-align:end;"><span>NOS</span></td>
          <td style="padding-left:10px; text-align:end;"><span>${discPer}%</span></td>
          <td style="padding-left:15px; text-align:end;"><span>₹${newRate}</span></td>
        </tr>`;
        
        invoiceDetailTable += invoiceDataHtml;
    }
    
  
    const cgstAndSgstDetail = `
                      <tr>
                          <td style="color:#212529; padding-left:10px; text-align:right;"><span>CGST</span></td>
                          <td></td>
                          <td class="text-right"><span>₹${item?.CGST}</span></td>
                      </tr>
                      <tr>
                          <td style="color:#212529; padding-left:10px; text-align:right;"><span>SGST</span></td>
                          <td></td>
                          <td class="text-right"><span>₹${item?.SGST}</span></td>
                      </tr>
    `
  
    const igstDetail = `
                  <tr>
                      <td style="color:#212529; padding-left:10px; text-align:right;"><span>IGST</span></td>
                      <td></td>
                      <td class="text-right"><span>₹${item?.IGST}</span></td>
                  </tr>
    `
  
    const cgstAndSgstTable = `
      <table>
      <thead>
          <th></th>
          <th class="font-medium" style="border-right:1px solid #CED4DA; padding-right:40px;">Taxable Value</th>
          <th class="font-medium" style="padding-right:3px;">CGST</th>
          <th class="font-medium" style="padding-right:3px;">SGST</th>
          <th class="font-medium">Total Tax Amount</th>
      </thead>
      <tbody>
          <tr>
              <td></td>
              <td style="border-right:1px solid #CED4DA; padding-right:40px;">₹${(grosTotal - (cgst + sgst)).toFixed(2)}</td>
              <td>
                  <div class="inner-table-head">
                      <div>Rate</div>
                      <div>Amount</div>
                  </div>
                  <div class="inner-table-body">
                      <div>${((item.CGST * 100) / grosTotal).toFixed(2)}%</div>
                      <div>₹${item.CGST}</div>
                  </div>
              </td>
              <td>
                  <div class="inner-table-head">
                      <div>Rate</div>
                      <div>Amount</div>
                  </div>
                  <div class="inner-table-body">
                      <div>${((item.SGST * 100) / grosTotal).toFixed(2)}%</div>
                      <div>₹${item.SGST}</div>
                  </div>
              </td>
              <td>₹${(sgst + cgst).toFixed(2)}</td>
          </tr>
          <tr>
              <td></td>
              <td style="border-right:1px solid #CED4DA; padding-right:40px;">Total</td>
              <td><span class="color-blue" style="padding-right:2px;">₹${item.CGST}</span></td>
              <td><span class="color-blue" style="padding-right:2px;">₹${item.SGST}</span></td>
              <td><span class="color-blue">₹${(sgst + cgst).toFixed(
                2
              )}</span></td>
          </tr>
      </tbody>
    </table>
      `;
  
    const igstTable = `<table>
      <thead>
          <th></th>
          <th class="font-medium">Taxable Value</th>
          <th class="font-medium">IGST</th>
          <th class="font-medium">Total Tax Amount</th>
      </thead>
      <tbody>
          <tr>
              <td></td>
              <td>₹${grosTotal - igst}</td>
              <td class="inner-table">
                  <div class="inner-table-head">
                      <div>Rate</div>
                      <div>Amount</div>
                  </div>
                  <div class="inner-table-body">
                      <div>${((igst * 100) / grosTotal).toFixed(2)}%</div>
                      <div>₹${igst}</div>
                  </div>
              </td>
              <td>₹${igst}</td>
          </tr>
          <tr>
              <td></td>
              <td>Total</td>
              <td><span class="color-blue">₹${igst}</span></td>
              <td><span class="color-blue">₹${igst}</span></td>
          </tr>
      </tbody>
    </table>
      `;
    const taxTable = item.IGST ? igstTable : cgstAndSgstTable;
  
    const taxDetails = item.IGST ? igstDetail : cgstAndSgstDetail;
  
  
    
      return `<!DOCTYPE html
        PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>
        <html xmlns='http://www.w3.org/1999/xhtml' xml:lang='en' lang='en'>
        
        <head>
        <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
        <title>Accounting Voucher Display</title>
        <meta name='author' content='TallyPrime' />
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet">
        <!-- Include jQuery -->
        <script src="https://code.jquery.com/jquery-3.5.1.js"></script>
        <style type='text/css'>
            .pagebreak {
                page-break-before: always;
            }
        
            * {
                font-family: 'Inter', sans-serif;
               font-size: 10px;
                font-weight: 500;
                padding: 0;
                margin: 0; 
            }
            body{
              height:100%;
              position:relative;
            }
            #header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px 25px 10px 25px;
            }
        
            #header .left {
                display: flex;
                align-items: center;
                gap: 20px;
                font-family: 'Inter', sans-serif;
            }
        
            #header .right {
                display: flex;
                align-items: center;
                gap: 20px;
                font-family: 'Inter', sans-serif;
            }
        
            #header .title {
                font-weight: 600;
                font-size: 14px;
                line-height: 16.94px;
                font-family: 'Inter', sans-serif;
            }
        
            .date {
                font-size: 8px;
                font-weight: 500;
                color: #495057;
                background-color: #FFBA49;
                border-radius: 100px;
                padding: 2px 6px 2px 6px;
                font-family: 'Inter', sans-serif;
            }
        
            #viewer {
                background-color: white;
                display: flex;
                justify-content: center;
                flex-direction: column;
                width: 100%;
                padding: 0 20px;
            }
        
            .persondetail.main {
                display: flex;
                justify-content: center;
                flex-direction: column;
                background-color: #e9ecef;
                margin: 0px 25px 0px 25px;
                padding: 8px;
                border-radius: 8px;
                width: calc(100% - 50px);
            }
        
            .personal-detail-logo-name {
                display: flex;
                align-items: center;
                gap: 5px;
                width: 125px;
            }
        
            .personal-details-heading {
                font-family: 'Inter', sans-serif;
                font-size: 10px;
                font-weight: 500;
                line-height: 9.68px;
                color: #495057;
            }
        
            .personal-details-data {
                font-family: 'Inter', sans-serif;
                font-size: 10px;
                font-weight: 500;
                line-height: 9.68px;
                color: #868E96;
                display: flex;
                align-items: center;
            }
        
            .personal-detail-box {
                background-color: white;
                border: 1px dashed #DEE2E6;
                border-radius: 6px;
                display: flex;
                padding: 10px 30px;
                margin-top:04px;
            }
        
            .personal-detail-inner-box1 {
                width: 72%;
                display: flex;
                flex-direction: column;
                gap: 4px;
                padding-right: 20px;
            }
        
            .personal-detail-inner-box2 {
                width: 45%;
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
        
            .personal-detail-inner-box2-padding {
                padding-left: 20px;
            }
        
            .personal-detail-sub-box {
                display: flex;
                align-items: center;
            }
        
        
            table {
                border-collapse: collapse;
            }
        
            .billing {
                display: flex;
                flex-direction: column;
                margin: 5px;
                padding: 5px 48px 5px 48px;
            }
        
            .billing table {
                table-layout: fixed;
                background-color: #fff;
                border-radius: 6px;
                margin: 5px 0px;
                text-align: left;
            }
        
            .billing table td,
            .billing table thead th {
                border-bottom: 1px solid rgba(168, 168, 168, 0.371);
                font-size: 8px;
                font-weight: 500;
                letter-spacing: -0.02em;
                text-align: left;
                color: #495057;
                padding: 4px;
            }
        
            .billing table td {
                color: #868E96;
            }
        
            .billing table td:nth-child(2) {
                font-size: 6px;
                font-weight: 600;
            }
        
            .billing table td:last-child {
                text-align: right;
                color: #212529;
            }
        
            .billing th span {
                display: block;
                min-width: 50px;
            }
        
            .taxable-table {
                border: 1px dashed #CED4DA;
                border-radius: 10px;
                margin: 0px 48px;
                background-color: #f8f9fa;
            }
        
            .taxable-table table {
                width: 100%;
                box-shadow: 0px 4px 4px 0px #00000040;
            }
        
            .taxable-table table tr,
            .taxable-table table th {
                border-bottom: 0.5px solid #CED4DA;
        
            }
        
            .taxable-table table tr:last-child {
                border-bottom: none
            }
        
            .taxable-table table tr td:nth-last-child(-n+2),
            .taxable-table table th:nth-last-child(-n+2) {
                border-left: 1px solid #CED4DA;
            }
        
            .taxable-table table td,
            .taxable-table table th {
                text-align: right;
                padding: 4px;
        
            }
        
            .taxable-table table td:first-child {
                width: 300px;
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
                justify-content: center;
                align-items: end;
                gap: 15px;
            }
        
            .inner-table-head div {
                font-size: 7px;
                font-weight: 600;
                color: #868E96
            }
        
            .declaration-box {
                display: flex;
                justify-content: space-between;
                font-size: 10px;
                margin-top: 10px;
                padding: 0px 25px;
            }
        
            .declaration-header {
                font-size: 10px;
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
        
        
            .font-medium {
                font-size: 10px;
            }
        
            .text-left {
                text-align: left;
            }
        
            .text-right {
                text-align: right;
            }
        
            .color-blue {
                color: #4263EB;
        
            }
        
            .billing table .inwords {
                font-size: 8px;
                font-weight: 600;
                text-align: right;
            }
            
            .footer-image {
                margin-top: 20px;
                width: 100%;
            }
        
            .personal-details-empty-box {
                border-radius: 4px;
                width: 198px;
                height: 34px;
                border: 1px solid #DEE2E6;
                background-color: #F8F9FA;
            }
            .qr-code {
                width: 80px;
                hegiht:70px;
            }
        
            .footer{
                padding: 22px 42px;
                background-color: #E4F1EE;
                margin-top: 20px;
                display: flex;
                justify-content: space-between;
            }
            .footer-left{
                display: flex;
                gap: 20px;
            }
            .hexcode-container{
                border: 2px dotted #212529;
                border-radius: 8px;
                position: relative;
                padding: 10px 40px;
                width: 280px;
            }
            .hexcode-cut-icon{
                position: absolute;
                top: -10px;
                left: 20%
            }
            .hexcode-box{
                display: flex;
                flex-direction: column;
            }
            .footer-coupon-text{
                font-size: 20px;
                font-weight: 400;
                color: #868E96;
            }
            .footer-hexcode-text{
                font-size: 20px;
                font-weight: 700;
                color: #212529;
            }
            .footer-right-container{
                font-size: 16px;
                font-weight: 500;
                line-height: 19.2px;
                color: #212529;
                width: 225px;
                padding-right:40px;
            }
            .footer-left-bottom{
                margin-top: 10px;
                font-size: 8px;
                font-weight: 500;
                color: #212529;
            }
            .color-safron{
                color: #FFBA49;
            }
    
        </style>
        </head>
        
        <body>
        <div id="viewer">
            <div id="header">
                <div class="left">
                    <div class="logo"><img src="logo.png" alt="Logo" srcset=""></div>
                    <div class="title">Tax Invoice</div>
                    <div class="date">${item?.Date}</div>
                </div>
                <div class="right">
                    <div class="icon download"><span>
                            <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M11.75 10.75H11.7575M12.05 8.5H12.5C13.1989 8.5 13.5483 8.5 13.824 8.61415C14.1915 8.7664 14.4836 9.05845 14.6358 9.42595C14.75 9.70165 14.75 10.0511 14.75 10.75C14.75 11.4489 14.75 11.7983 14.6358 12.074C14.4836 12.4415 14.1915 12.7336 13.824 12.8858C13.5483 13 13.1989 13 12.5 13H3.5C2.80109 13 2.45164 13 2.17597 12.8858C1.80844 12.7336 1.51642 12.4415 1.36418 12.074C1.25 11.7983 1.25 11.4489 1.25 10.75C1.25 10.0511 1.25 9.70165 1.36418 9.42595C1.51642 9.05845 1.80844 8.7664 2.17597 8.61415C2.45164 8.5 2.80109 8.5 3.5 8.5H3.95M8 9.25V1M8 9.25L5.75 7M8 9.25L10.25 7"
                                    stroke="#4263EB" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </span>
                    </div>
                    <div class="icon print"><span>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M4.25 12.5H3.65C2.80992 12.5 2.38988 12.5 2.06902 12.3365C1.78677 12.1927 1.5573 11.9632 1.41349 11.681C1.25 11.3602 1.25 10.9401 1.25 10.1V6.65C1.25 5.80992 1.25 5.38988 1.41349 5.06902C1.5573 4.78677 1.78677 4.5573 2.06902 4.41349C2.38988 4.25 2.80992 4.25 3.65 4.25H4.25M4.25 4.25V3.05V2.45C4.25 2.02996 4.25 1.81994 4.33174 1.65951C4.40365 1.51839 4.51839 1.40365 4.65951 1.33174C4.81994 1.25 5.02996 1.25 5.45 1.25H10.55C10.9701 1.25 11.1801 1.25 11.3405 1.33174C11.4817 1.40365 11.5963 1.51839 11.6683 1.65951C11.75 1.81994 11.75 2.02996 11.75 2.45V3.05V4.25M4.25 4.25H11.75M11.75 12.5H12.35C13.1901 12.5 13.6102 12.5 13.931 12.3365C14.2132 12.1927 14.4427 11.9632 14.5865 11.681C14.75 11.3602 14.75 10.9401 14.75 10.1V6.65C14.75 5.80992 14.75 5.38988 14.5865 5.06902C14.4427 4.78677 14.2132 4.5573 13.931 4.41349C13.6102 4.25 13.1901 4.25 12.35 4.25H11.75M4.25 7.25H4.2575M5.45 14.75H10.55C10.9701 14.75 11.1801 14.75 11.3405 14.6683C11.4817 14.5963 11.5963 14.4817 11.6683 14.3405C11.75 14.1801 11.75 13.9701 11.75 13.55V11.45C11.75 11.0299 11.75 10.8199 11.6683 10.6595C11.5963 10.5183 11.4817 10.4037 11.3405 10.3318C11.1801 10.25 10.9701 10.25 10.55 10.25H5.45C5.02996 10.25 4.81994 10.25 4.65951 10.3318C4.51839 10.4037 4.40365 10.5183 4.33174 10.6595C4.25 10.8199 4.25 11.0299 4.25 11.45V13.55C4.25 13.9701 4.25 14.1801 4.33174 14.3405C4.40365 14.4817 4.51839 14.5963 4.65951 14.6683C4.81994 14.75 5.02996 14.75 5.45 14.75Z"
                                    stroke="#4263EB" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
            <div class="persondetail main">
                <div class="personal-detail-box">
                    <div class="personal-detail-inner-box1">
                        <div class="personal-detail-sub-box">
                            <div class="personal-detail-logo-name">
                                <span>
                                    <svg width="6" height="8" viewBox="0 0 6 8" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M0.5 7.21428C0.5 5.83356 1.61929 4.71428 3 4.71428C4.38071 4.71428 5.5 5.83356 5.5 7.21428M4.42857 2.21428C4.42857 3.00326 3.78896 3.64285 3 3.64285C2.21102 3.64285 1.57143 3.00326 1.57143 2.21428C1.57143 1.4253 2.21102 0.785706 3 0.785706C3.78896 0.785706 4.42857 1.4253 4.42857 2.21428Z"
                                            stroke="#868E96" stroke-width="0.5" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </svg>
                                </span>
                                <span class="personal-details-heading">Name</span>
                            </div>
                            <div class="personal-details-data">${item?.Particulars}</div>
                        </div>
                        <div class="personal-detail-sub-box">
                            <div class="personal-detail-logo-name">
                                <span>
                                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M6 1.99999H4.66667M6 2.99999H4.66667M4 4.16666C3.90547 3.78629 3.49367 3.49999 3 3.49999C2.50633 3.49999 2.09455 3.78629 2 4.16666M2.06667 5.33332H5.93333C6.3067 5.33332 6.4934 5.33332 6.636 5.26066C6.76143 5.19676 6.86343 5.09476 6.92733 4.96932C7 4.82672 7 4.64002 7 4.26666V1.73332C7 1.35996 7 1.17327 6.92733 1.03066C6.86343 0.90522 6.76143 0.803233 6.636 0.73932C6.4934 0.666656 6.3067 0.666656 5.93333 0.666656H2.06667C1.6933 0.666656 1.50661 0.666656 1.36401 0.73932C1.23856 0.803233 1.13658 0.90522 1.07266 1.03066C1 1.17327 1 1.35995 1 1.73332V4.26666C1 4.64002 1 4.82672 1.07266 4.96932C1.13658 5.09476 1.23856 5.19676 1.36401 5.26066C1.50661 5.33332 1.6933 5.33332 2.06667 5.33332ZM3.33333 2.16666C3.33333 2.35076 3.18409 2.49999 3 2.49999C2.81591 2.49999 2.66667 2.35076 2.66667 2.16666C2.66667 1.98256 2.81591 1.83332 3 1.83332C3.18409 1.83332 3.33333 1.98256 3.33333 2.16666Z"
                                            stroke="#868E96" stroke-width="0.5" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </svg>
                                </span>
                                <span class="personal-details-heading">Address</span>
                            </div>
                            <div class="personal-details-data">7F, Snn Raj Pinnacle , ITPL Main Road Bengaluru</div>
                        </div>
                        <div class="personal-detail-sub-box">
                            <div class="personal-detail-logo-name">
                                <span>
                                    <svg width="6" height="6" viewBox="0 0 6 6" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M5.5 4.66667L5.26953 2.93808C5.23308 2.66478 5.21486 2.52811 5.14978 2.42523C5.09242 2.33457 5.01006 2.26245 4.91261 2.21758C4.80203 2.16667 4.66417 2.16667 4.38842 2.16667H1.61157C1.33584 2.16667 1.19798 2.16667 1.08739 2.21758C0.989947 2.26245 0.907575 2.33457 0.850225 2.42523C0.785139 2.52811 0.766919 2.66478 0.730478 2.93808L0.5 4.66667M5.5 4.66667H0.5M5.5 4.66667V5.05556C5.5 5.21114 5.5 5.28892 5.46972 5.34833C5.44308 5.40061 5.40061 5.44308 5.34833 5.46972C5.28892 5.5 5.21114 5.5 5.05556 5.5H0.944444C0.788875 5.5 0.711089 5.5 0.651669 5.46972C0.599403 5.44308 0.556908 5.40061 0.530275 5.34833C0.5 5.28892 0.5 5.21114 0.5 5.05556V4.66667M1.75 3V3.00278M2.58333 3V3.00278M2.16667 3.83333V3.83611M3 3.83333V3.83611M3.83333 3.83333V3.83611M3.41667 3V3.00278M4.25 3V3.00278M2.16667 2.16667V1.33333M1.27778 1.33333H3.05556C3.13333 1.33333 3.17222 1.33333 3.20194 1.31819C3.22808 1.30488 3.24933 1.28363 3.26264 1.2575C3.27778 1.22779 3.27778 1.1889 3.27778 1.11111V0.722222C3.27778 0.644436 3.27778 0.605544 3.26264 0.575833C3.24933 0.5497 3.22808 0.528453 3.20194 0.515139C3.17222 0.5 3.13333 0.5 3.05556 0.5H1.27778C1.19999 0.5 1.1611 0.5 1.13139 0.515139C1.10526 0.528453 1.08401 0.5497 1.07069 0.575833C1.05556 0.605544 1.05556 0.644436 1.05556 0.722222V1.11111C1.05556 1.1889 1.05556 1.22779 1.07069 1.2575C1.08401 1.28363 1.10526 1.30488 1.13139 1.31819C1.1611 1.33333 1.19999 1.33333 1.27778 1.33333Z"
                                            stroke="#868E96" stroke-width="0.5" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </svg>
                                </span>
                                <span class="personal-details-heading">GSTIN/UIN</span>
                            </div>
                            <div class="personal-details-data">${item["GSTIN/UIN"]}</div>
                        </div>
                        <div class="personal-detail-sub-box">
                            <div class="personal-detail-logo-name">
                                <span>
                                    <svg width="6" height="6" viewBox="0 0 6 6" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M3 1.47222H3.00278M2.16667 5.36111L0.5 4.52777V0.916663L1.05556 1.19444M2.16667 5.36111L3.83333 4.52777M2.16667 5.36111V3.69444M3.83333 4.52777L5.5 5.36111V1.75L4.94444 1.47222M3.83333 4.52777V3.69444M3.83333 1.52777C3.83333 2.01869 3.41667 2.41666 3 2.86111C2.58333 2.41666 2.16667 2.01869 2.16667 1.52777C2.16667 1.03685 2.53975 0.638885 3 0.638885C3.46025 0.638885 3.83333 1.03685 3.83333 1.52777Z"
                                            stroke="#868E96" stroke-width="0.5" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </svg>
                                </span>
                                <span class="personal-details-heading">State Name</span>
                            </div>
                            <div class="personal-details-data">Karnataka</div>
                        </div>
                        <div class="personal-detail-sub-box">
                            <div class="personal-detail-logo-name">
                                <span>
                                    <svg width="6" height="6" viewBox="0 0 6 6" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M1.61111 1.88888L0.5 2.91452L1.61111 4.1111M4.38889 1.88888L5.5 2.91452L4.38889 4.1111M3.55556 0.777771L2.44444 5.22222"
                                            stroke="#868E96" stroke-width="0.5" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </svg>
                                </span><span class="personal-details-heading">Code</span>
                            </div>
                            <div class="personal-details-data">29</div>
                        </div>
                    </div>
                    <div class="personal-detail-inner-box2 personal-detail-inner-box2-padding">
                        <div class="personal-detail-sub-box">
                            <div class="personal-detail-logo-name"><span class="personal-details-heading">Invoice No</span>
                            </div>
                            <div class="personal-details-data"><span class="date">${item["Voucher No."]}</span></div>
                        </div>
                        <div class="personal-detail-sub-box">
                            <div class="personal-detail-logo-name"><span class="personal-details-heading">Mode/</span><span
                                    class="personal-details-data">Terms of Payment</span></div>
                            <div class="personal-details-data"></div>
                        </div>
                        <div class="personal-detail-sub-box">
                            <div class="personal-detail-logo-name">
                                <span class="personal-details-heading">Buyer's Order No.</span>
                            </div>
                            <div></div>
                        </div>
                        <div class="personal-detail-sub-box">
                            <div class="personal-detail-logo-name">
                                <span class="personal-details-heading">Terms of Delivery</span>
                            </div>
                            <div class="personal-details-data"></div>
                        </div>
                        <div class="personal-details-empty-box">
                        </div>
                    </div>
                </div>
                <div class="personal-detail-box">
                    <div class="personal-detail-inner-box1">
                        <div class="personal-detail-sub-box">
                            <div class="personal-detail-logo-name">
                                <span>
                                    <svg width="6" height="8" viewBox="0 0 6 8" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M0.5 7.21428C0.5 5.83356 1.61929 4.71428 3 4.71428C4.38071 4.71428 5.5 5.83356 5.5 7.21428M4.42857 2.21428C4.42857 3.00326 3.78896 3.64285 3 3.64285C2.21102 3.64285 1.57143 3.00326 1.57143 2.21428C1.57143 1.4253 2.21102 0.785706 3 0.785706C3.78896 0.785706 4.42857 1.4253 4.42857 2.21428Z"
                                            stroke="#868E96" stroke-width="0.5" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </svg>
                                </span>
                                <span class="personal-details-heading">Consignee</span><span
                                    class="personal-details-data">Ship to</span>
                            </div>
                            <div class="personal-details-data">Manish Asawa</div>
                        </div>
                        <div class="personal-detail-sub-box">
                            <div class="personal-detail-logo-name">
                                <span>
                                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M6 1.99999H4.66667M6 2.99999H4.66667M4 4.16666C3.90547 3.78629 3.49367 3.49999 3 3.49999C2.50633 3.49999 2.09455 3.78629 2 4.16666M2.06667 5.33332H5.93333C6.3067 5.33332 6.4934 5.33332 6.636 5.26066C6.76143 5.19676 6.86343 5.09476 6.92733 4.96932C7 4.82672 7 4.64002 7 4.26666V1.73332C7 1.35996 7 1.17327 6.92733 1.03066C6.86343 0.90522 6.76143 0.803233 6.636 0.73932C6.4934 0.666656 6.3067 0.666656 5.93333 0.666656H2.06667C1.6933 0.666656 1.50661 0.666656 1.36401 0.73932C1.23856 0.803233 1.13658 0.90522 1.07266 1.03066C1 1.17327 1 1.35995 1 1.73332V4.26666C1 4.64002 1 4.82672 1.07266 4.96932C1.13658 5.09476 1.23856 5.19676 1.36401 5.26066C1.50661 5.33332 1.6933 5.33332 2.06667 5.33332ZM3.33333 2.16666C3.33333 2.35076 3.18409 2.49999 3 2.49999C2.81591 2.49999 2.66667 2.35076 2.66667 2.16666C2.66667 1.98256 2.81591 1.83332 3 1.83332C3.18409 1.83332 3.33333 1.98256 3.33333 2.16666Z"
                                            stroke="#868E96" stroke-width="0.5" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </svg>
                                </span>
                                <span class="personal-details-heading">Address</span>
                            </div>
                            <div class="personal-details-data">7F, Snn Raj Pinnacle , ITPL Main Road Bengaluru</div>
                        </div>
                        <div class="personal-detail-sub-box">
                            <div class="personal-detail-logo-name">
                                <span>
                                    <svg width="6" height="6" viewBox="0 0 6 6" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M5.5 4.66667L5.26953 2.93808C5.23308 2.66478 5.21486 2.52811 5.14978 2.42523C5.09242 2.33457 5.01006 2.26245 4.91261 2.21758C4.80203 2.16667 4.66417 2.16667 4.38842 2.16667H1.61157C1.33584 2.16667 1.19798 2.16667 1.08739 2.21758C0.989947 2.26245 0.907575 2.33457 0.850225 2.42523C0.785139 2.52811 0.766919 2.66478 0.730478 2.93808L0.5 4.66667M5.5 4.66667H0.5M5.5 4.66667V5.05556C5.5 5.21114 5.5 5.28892 5.46972 5.34833C5.44308 5.40061 5.40061 5.44308 5.34833 5.46972C5.28892 5.5 5.21114 5.5 5.05556 5.5H0.944444C0.788875 5.5 0.711089 5.5 0.651669 5.46972C0.599403 5.44308 0.556908 5.40061 0.530275 5.34833C0.5 5.28892 0.5 5.21114 0.5 5.05556V4.66667M1.75 3V3.00278M2.58333 3V3.00278M2.16667 3.83333V3.83611M3 3.83333V3.83611M3.83333 3.83333V3.83611M3.41667 3V3.00278M4.25 3V3.00278M2.16667 2.16667V1.33333M1.27778 1.33333H3.05556C3.13333 1.33333 3.17222 1.33333 3.20194 1.31819C3.22808 1.30488 3.24933 1.28363 3.26264 1.2575C3.27778 1.22779 3.27778 1.1889 3.27778 1.11111V0.722222C3.27778 0.644436 3.27778 0.605544 3.26264 0.575833C3.24933 0.5497 3.22808 0.528453 3.20194 0.515139C3.17222 0.5 3.13333 0.5 3.05556 0.5H1.27778C1.19999 0.5 1.1611 0.5 1.13139 0.515139C1.10526 0.528453 1.08401 0.5497 1.07069 0.575833C1.05556 0.605544 1.05556 0.644436 1.05556 0.722222V1.11111C1.05556 1.1889 1.05556 1.22779 1.07069 1.2575C1.08401 1.28363 1.10526 1.30488 1.13139 1.31819C1.1611 1.33333 1.19999 1.33333 1.27778 1.33333Z"
                                            stroke="#868E96" stroke-width="0.5" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </svg>
                                </span>
                                <span class="personal-details-heading">State Name</span>
                            </div>
                            <div class="personal-details-data">Maharashtra</div>
                        </div>
                        <div class="personal-detail-sub-box">
                            <div class="personal-detail-logo-name">
                                <span>
                                    <svg width="6" height="6" viewBox="0 0 6 6" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M3 1.47222H3.00278M2.16667 5.36111L0.5 4.52777V0.916663L1.05556 1.19444M2.16667 5.36111L3.83333 4.52777M2.16667 5.36111V3.69444M3.83333 4.52777L5.5 5.36111V1.75L4.94444 1.47222M3.83333 4.52777V3.69444M3.83333 1.52777C3.83333 2.01869 3.41667 2.41666 3 2.86111C2.58333 2.41666 2.16667 2.01869 2.16667 1.52777C2.16667 1.03685 2.53975 0.638885 3 0.638885C3.46025 0.638885 3.83333 1.03685 3.83333 1.52777Z"
                                            stroke="#868E96" stroke-width="0.5" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </svg>
                                </span>
                                <span class="personal-details-heading">Code</span>
                            </div>
                            <div class="personal-details-data">27</div>
                        </div>
                    </div>
                    <div class="personal-detail-inner-box2">
                        <div class="personal-detail-sub-box">
                            <div class="personal-detail-logo-name">
                                <span>
                                    <svg width="6" height="8" viewBox="0 0 6 8" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M0.5 7.21428C0.5 5.83356 1.61929 4.71428 3 4.71428C4.38071 4.71428 5.5 5.83356 5.5 7.21428M4.42857 2.21428C4.42857 3.00326 3.78896 3.64285 3 3.64285C2.21102 3.64285 1.57143 3.00326 1.57143 2.21428C1.57143 1.4253 2.21102 0.785706 3 0.785706C3.78896 0.785706 4.42857 1.4253 4.42857 2.21428Z"
                                            stroke="#868E96" stroke-width="0.5" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </svg>
                                </span>
                                <span class="personal-details-heading">Bill to /</span><span
                                    class="personal-details-data">Buyer</span>
                            </div>
                            <div class="personal-details-data">Manish Asawa</div>
                        </div>
                        <div class="personal-detail-sub-box">
                            <div class="personal-detail-logo-name">
                                <span>
                                    <svg width="6" height="6" viewBox="0 0 6 6" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M5.5 4.66667L5.26953 2.93808C5.23308 2.66478 5.21486 2.52811 5.14978 2.42523C5.09242 2.33457 5.01006 2.26245 4.91261 2.21758C4.80203 2.16667 4.66417 2.16667 4.38842 2.16667H1.61157C1.33584 2.16667 1.19798 2.16667 1.08739 2.21758C0.989947 2.26245 0.907575 2.33457 0.850225 2.42523C0.785139 2.52811 0.766919 2.66478 0.730478 2.93808L0.5 4.66667M5.5 4.66667H0.5M5.5 4.66667V5.05556C5.5 5.21114 5.5 5.28892 5.46972 5.34833C5.44308 5.40061 5.40061 5.44308 5.34833 5.46972C5.28892 5.5 5.21114 5.5 5.05556 5.5H0.944444C0.788875 5.5 0.711089 5.5 0.651669 5.46972C0.599403 5.44308 0.556908 5.40061 0.530275 5.34833C0.5 5.28892 0.5 5.21114 0.5 5.05556V4.66667M1.75 3V3.00278M2.58333 3V3.00278M2.16667 3.83333V3.83611M3 3.83333V3.83611M3.83333 3.83333V3.83611M3.41667 3V3.00278M4.25 3V3.00278M2.16667 2.16667V1.33333M1.27778 1.33333H3.05556C3.13333 1.33333 3.17222 1.33333 3.20194 1.31819C3.22808 1.30488 3.24933 1.28363 3.26264 1.2575C3.27778 1.22779 3.27778 1.1889 3.27778 1.11111V0.722222C3.27778 0.644436 3.27778 0.605544 3.26264 0.575833C3.24933 0.5497 3.22808 0.528453 3.20194 0.515139C3.17222 0.5 3.13333 0.5 3.05556 0.5H1.27778C1.19999 0.5 1.1611 0.5 1.13139 0.515139C1.10526 0.528453 1.08401 0.5497 1.07069 0.575833C1.05556 0.605544 1.05556 0.644436 1.05556 0.722222V1.11111C1.05556 1.1889 1.05556 1.22779 1.07069 1.2575C1.08401 1.28363 1.10526 1.30488 1.13139 1.31819C1.1611 1.33333 1.19999 1.33333 1.27778 1.33333Z"
                                            stroke="#868E96" stroke-width="0.5" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </svg>
                                </span>
                                <span class="personal-details-heading">State Name</span>
                            </div>
                            <div class="personal-details-data">Maharashtra</div>
                        </div>
                        <div class="personal-detail-sub-box">
                            <div class="personal-detail-logo-name">
                                <span>
                                    <svg width="6" height="6" viewBox="0 0 6 6" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M3 1.47222H3.00278M2.16667 5.36111L0.5 4.52777V0.916663L1.05556 1.19444M2.16667 5.36111L3.83333 4.52777M2.16667 5.36111V3.69444M3.83333 4.52777L5.5 5.36111V1.75L4.94444 1.47222M3.83333 4.52777V3.69444M3.83333 1.52777C3.83333 2.01869 3.41667 2.41666 3 2.86111C2.58333 2.41666 2.16667 2.01869 2.16667 1.52777C2.16667 1.03685 2.53975 0.638885 3 0.638885C3.46025 0.638885 3.83333 1.03685 3.83333 1.52777Z"
                                            stroke="#868E96" stroke-width="0.5" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </svg>
                                </span>
                                <span class="personal-details-heading">Code</span>
                            </div>
                            <div class="personal-details-data">27</div>
                        </div>
                    </div>
                </div>
        
        
            </div>
            <div class="billing">
                <table>
                    <thead>
                        <tr>
                            <th><span>SI No.</span></th>
                            <th style=""><span>Description of Goods</span></th>
                            <th style="text-align:end;"><span>HAS/SAC</span></th>
                            <th style="text-align:end;"><span>Qty.</span></th>
                            <th style="text-align:end;"><span>Rate</span></th>
                            <th style="text-align:end;"><span>per</span></th>
                            <th style="text-align:end;"><span>Disc. %</span></th>
                            <th style="text-align:end;"><span>Amount</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        ${invoiceDetailTable}
                        <tr>
                            <td rowspan="4" colspan="5"><span></span></td>
                            <td style="color:#212529; padding-left:10px; text-align:right;"><span>Subtotal</span></td>
                            <td></td>
                            <td class="text-right" style="color:#212529"><span>₹${
                              item.Value
                            }</span></td>
                        </tr>
                        <tr>
                            <td style="color:#212529; padding-left:10px; text-align:right;"><span>Discount</span></td>
                            <td></td>
                            <td class="text-right" style="color:#212529"><span>₹${Math.abs(item?.Discount ?? 0)}</span></td>
                        </tr>
                        ${taxDetails}
                      <tr>
                        <tr>
                            <td colspan="3"></td>
                            <td><span>${item.Quantity}</span></td>
                            <td></td>
                            <td style="text-align:right; color:#212529;"><span>Total</span></td>
                            <td></td>
                            <td class="text-right"><span class="color-blue">₹${grosTotal}</span></td>
                        </tr>
                        <tr>
                            <td colspan="2" style="color:#212529;"><span>Amount Chargeable (in words) E. & O.E</span></td>
                            <td colspan="6" class="inwords"><span class="color-blue">INR Eight Thousand One Hundred Seventy
                                    Four Only</span>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="color:#212529;"><span>Tax Amounts in words</span></td>
                            <td colspan="6" class="inwords"><span class="color-blue">INR Two Hundred Forty and Seventy paise
                                    Only</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="taxable-table">
               ${taxTable}
            </div>
            <div class="declaration-box">
                <div class="declaration-left-side">
                    <div class="declaration-header">Declaration</div>
                    <div class="declaration-content">We declare that this invoice shows the actual price of the goods
                        described and that all particulars are true and correct.
                    </div>
                </div>
                <div class="declaration-right-side declaration-signature-box">
                    <div style="color:#868E96;">for <span style="color:#495057;">HOBC IMPORT EXPORT PRIVATE LIMITED</span>
                    </div>
                    <div class="declaration-signature-box">
                        <div class="declaration-signature date" style="color:#212529;">Authorised Signatory</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="footer-left-container">
                <div class="footer-left">
                    <img src="${qr}" class="qr-code img-thumbnail img-responsive" />
                    <div class="hexcode-container">
                        <div class="hexcode-cut-icon">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.15179 13.85L19 2M10.3249 10L6.15 6.15M19 18L13 12.4669M7 4C7 5.65685 5.65685 7 4 7C2.34315 7 1 5.65685 1 4C1 2.34315 2.34315 1 4 1C5.65685 1 7 2.34315 7 4ZM7 16C7 17.6569 5.65685 19 4 19C2.34315 19 1 17.6569 1 16C1 14.3431 2.34315 13 4 13C5.65685 13 7 14.3431 7 16Z" stroke="#212529" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        </div>
                        <div class="hexcode-box">
                            <div class="footer-coupon-text">COUPON</div>
                            <div class="footer-hexcode-text">HXYASOA100</div>
                        </div>
                    </div>
                </div>
                <div class="footer-left-bottom">
                    <div><span>If you've any questions regarding our coupon code, please visit our </span><span class="color-safron">help center.</span></div>
                    <div>All Rights Reserved.</div>
                </div>
            </div>
            <div class="footer-right-container">
                Unlock exclusive savings with this code the next time you checkout!
            </div>
        </div>
        </body>
        
        </html>`;
    };
    