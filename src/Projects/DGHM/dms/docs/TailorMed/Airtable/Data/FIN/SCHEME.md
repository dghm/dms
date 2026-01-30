---
sidebar_position: 3
---

# Schema

This document outlines the full schema design of the TailorMed CRM Base, including tables, fields, data types, and relationship structure.
All tables marked (Local Table) are created and maintained within this CRM base.
This schema serves as the foundation for customer management, quotation management, and logistics planning workflows.

## Base Information

- **Base Name**: 【TailorMed】CRM
- **Base ID**: appRjtQd5y7Q0hYUu
- **Total Tables**: 10

# 【TailorMed】FIN CRM Database Schema Documentation

This document describes the schema of the TailorMed FIN CRM Base, focusing on debit notes, charge items, profit analysis, and their links to operational and CRM data.  
Tables are marked as **(Local Table)** when maintained in this base, and **(External Table)** when synced from OMS/CRM or other systems.

---

## 1. ✏️ Debit Notes (Local Table)

Stores all debit note records issued to customers, including amounts, tax calculations, shipment references, and beneficiary banking details.

| Field Name                            | Type             | Description                                                              |
| ------------------------------------- | ---------------- | ------------------------------------------------------------------------ |
| Debit Note No.                        | Formula          | Auto-generated debit note identifier following `TM + YYMM + 000x` format |
| Invoice Date                          | Date             | Date when the debit note invoice is issued                               |
| Due Date                              | Date             | Payment due date for the debit note                                      |
| Net Amount                            | Rollup           | Total amount of all charge items before tax                              |
| Total Amount(with VAT)                | Formula          | Final amount including VAT calculations                                  |
| Invoice No.                           | Lookup           | Related invoice number from linked orders                                |
| Status                                | Single select    | Current status of debit note (Draft, Sent, Accepted, Rejected, Expired)  |
| 🔵 Non-Taxable Charges                | Linked record    | Connection to non-taxable charge items                                   |
| Bill to                               | Lookup           | Customer name from related quotation                                     |
| Bill to Add                           | Lookup           | Customer billing address from related quotation                          |
| HAWB / Ref. No#                       | Lookup           | House airway bill or reference number from related shipment              |
| MAWB                                  | Lookup           | Master airway bill number from related order                             |
| Collection Date                       | Lookup           | Scheduled pickup date from related shipment                              |
| Delivery Date                         | Lookup           | Scheduled delivery date from related shipment                            |
| Package Count                         | Lookup           | Number of packages from related order                                    |
| Gross Weight                          | Lookup           | Total weight of shipment from related order                              |
| Volumn Weight                         | Lookup           | Volumetric weight from related order                                     |
| Chargeable Weight                     | Lookup           | Billable weight for pricing from related order                           |
| Item Description                      | Long text        | Description of shipped items or services                                 |
| Shipper                               | Lookup           | Sender company name from related shipment                                |
| Shipper Add.                          | Lookup           | Sender address from related shipment                                     |
| Consignee Add.                        | Lookup           | Recipient address from related shipment                                  |
| Consignee(CRM)                        | Lookup           | Recipient company name from CRM-related shipment                         |
| 🔴 Charge Items                       | Linked record    | Connection to taxable charge line items                                  |
| VAT                                   | Number           | Tax rate percentage applied to taxable items                             |
| Total Amount                          | Formula          | Combined total of taxable and non-taxable charges                        |
| Bank Account                          | Linked record    | Linked payment bank account record (**Bene**)                            |
| Bene Name (from Bane Name)            | Lookup           | Beneficiary name from linked bank account                                |
| Bene's A/C No. (from Bane)            | Lookup           | Beneficiary account number from linked bank account                      |
| Bene's A/C With Bank (from Bane)      | Lookup           | Beneficiary bank name from linked bank account                           |
| Bene's Add. (from Bane)               | Lookup           | Beneficiary bank address from linked bank account                        |
| Swift Code                            | Lookup           | International bank transfer code from linked bank account                |
| Job No.                               | Formula          | Job reference number from related order                                  |
| Debit Note Description                | Long text        | Additional description or notes for the debit note                       |
| Incoterms                             | Single line text | International commercial terms for the transaction                       |
| Currency                              | Single select    | Currency for the transaction (e.g., TWD, USD)                            |
| VAT included                          | Formula          | Calculated VAT amount in currency                                        |
| Attachment                            | Attachment       | PDF file of the debit note                                               |
| Create By                             | Formula          | User who created the debit note                                          |
| Last Modified by                      | Formula          | User who last updated the debit note                                     |
| Non-Taxable Charge Net Amount         | Rollup           | Total amount of non-taxable charges                                      |
| Notes                                 | Long text        | Additional notes or comments for the debit note                          |
| Exchange Rate                         | Number           | Currency conversion rate used                                            |
| Created Date                          | Formula          | Timestamp when record was created                                        |
| Last Modified Time                    | Formula          | Timestamp when record was last updated                                   |
| Profit & Cost summary                 | Linked record    | Connection to profit analysis record (**Profit & Cost summary**)         |
| VAT TXT                               | Formula          | Formatted VAT percentage for display                                     |
| Currency TXT                          | Formula          | Currency code for display purposes                                       |
| Template Uses                         | Single select    | Template configuration option for document generation                    |
| Footer                                | Formula          | Footer image URL or reference for document template                      |
| Order No.                             | Linked record    | Connection to related order (**Orders(OMS)**)                            |
| Quotation No.                         | Linked record    | Connection to related quotation (**Quotations(CRM)**)                    |
| AIRWAYBILL/POD No.                    | Linked record    | Connection to related airwaybill / POD record (**AIRWAYBILL/POD(OMS)**)  |
| Charge Items from Quotations (參考用) | Lookup           | Reference charge items from quotation                                    |
| BillTo TXT                            | Formula          | Formatted billing address for display                                    |
| Trigger                               | Formula          | Computed trigger date (used for automation or reminders)                 |
| Closing Date                          | Date             | Date when debit note was finalized                                       |
| Received                              | Checkbox         | Indicates whether payment has been received                              |
| Handled By                            | Linked record    | Staff member responsible for processing (**Staffs(CRM)**)                |
| 🔴 計稅品項(暫)                       | Linked record    | Temporary taxable items connection (for transitional use)                |
| 🔵 不計稅品項(暫)                     | Linked record    | Temporary non-taxable items connection (for transitional use)            |

---

## 2. 🔴 Charge Items (Local Table)

Stores taxable charge line items associated with each debit note, referencing the charge catalog for standard pricing.

| Field Name         | Type             | Description                                            |
| ------------------ | ---------------- | ------------------------------------------------------ |
| Items              | Formula          | Unique identifier for charge item records              |
| Quantity           | Number           | Quantity of the charge item                            |
| Default Price      | Lookup           | Standard unit price from charge catalog                |
| Subtotal           | Formula          | Line total calculated from unit price and quantity     |
| Charge Items       | Linked record    | Connection to charge catalog item (**Charge Catalog**) |
| Unit               | Lookup           | Unit of measurement from charge catalog                |
| Manual Price       | Number           | Override unit price when different from default        |
| Notes              | Long text        | Additional notes for the charge item                   |
| Debit Note No.     | Linked record    | Parent debit note connection (**✏️ Debit Notes**)      |
| Quotations(CRM)    | Single line text | Reference to related quotation                         |
| Created Date       | Formula          | Record creation timestamp                              |
| Created By         | Formula          | User who created the record                            |
| Last Modified Time | Formula          | Last update timestamp                                  |
| Last Modified By   | Formula          | User who last updated the record                       |
| Uni Price TXT      | Formula          | Formatted unit price for display                       |
| Job No.            | Lookup           | Job number from related debit note                     |
| ✏️ Debit Notes     | Single line text | Text reference to parent debit note                    |

---

## 3. 🔵 Non-Taxable Charges (Local Table)

Stores non-taxable charge line items associated with each debit note.

| Field Name         | Type             | Description                                            |
| ------------------ | ---------------- | ------------------------------------------------------ |
| Items              | Formula          | Unique identifier for non-taxable charge records       |
| Debit Note No.     | Linked record    | Parent debit note connection (**✏️ Debit Notes**)      |
| Charge Item Name   | Linked record    | Connection to charge catalog item (**Charge Catalog**) |
| Description        | Long text        | Detailed description of the non-taxable charge         |
| Unit Price         | Number           | Price per unit for the charge                          |
| Quantity           | Number           | Quantity of the charge item                            |
| Unit               | Lookup           | Unit of measurement from charge catalog                |
| Subtotal           | Formula          | Line total calculated from unit price and quantity     |
| Total              | Formula          | Final amount for the non-taxable charge                |
| Notes              | Long text        | Additional notes or comments                           |
| Created Date       | Formula          | Record creation timestamp                              |
| Created By         | Formula          | User who created the record                            |
| Last Modified Time | Formula          | Last update timestamp                                  |
| Last Modified By   | Formula          | User who last updated the record                       |
| ✏️ Debit Notes     | Single line text | Text reference to parent debit note                    |

---

## 4. Profit & Cost summary (Local Table)

Summarizes revenue, estimated cost, and profit metrics per job/order, linked back to debit notes and quotations.

| Field Name           | Type             | Description                                              |
| -------------------- | ---------------- | -------------------------------------------------------- |
| Order (OMS)          | Single line text | Order management system reference (job/order identifier) |
| Partner's Name       | Lookup           | Customer name from related debit note                    |
| Actual Revenue       | Lookup           | Total revenue amount from debit note                     |
| Profit               | Formula          | Calculated profit after deducting estimated costs        |
| Currency             | Single select    | Currency for financial calculations (e.g., TWD, USD)     |
| Gross Margin         | Formula          | Profit margin percentage calculation                     |
| Notes                | Long text        | Additional notes for profit analysis                     |
| Estimated Cost       | Number           | Projected cost for the order                             |
| Link to [Debit Note] | Linked record    | Connection to related debit note (**✏️ Debit Notes**)    |
| Created Date         | Formula          | Record creation timestamp                                |
| Created By           | Formula          | User who created the record                              |
| Last Modified Time   | Formula          | Last update timestamp                                    |
| Last Modified By     | Formula          | User who last updated the record                         |
| Link to [Quotation]  | Linked record    | Connection to related quotation (**Quotations(CRM)**)    |

---

## 5. Charge Catalog (Local Table)

Master catalog of all chargeable items (containers/devices, operational fees, freight, additional charges) used for pricing.

| Field Name          | Type             | Description                                                                      |
| ------------------- | ---------------- | -------------------------------------------------------------------------------- |
| 品項名稱            | Formula          | Item name generated from component fields                                        |
| 品名                | Formula          | Full item description combining all naming fields                                |
| ••                  | Single select    | Item category or type classification                                             |
| Unit                | Single select    | Standard unit of measurement for pricing                                         |
| •••                 | Single select    | Size or capacity specifications                                                  |
| Unit Priece         | Number           | Standard unit price for the charge item                                          |
| •                   | Single select    | Primary service or item classification                                           |
| #                   | Single line text | Item reference number or code                                                    |
| Type                | Single select    | Charge type categorization (Container/Devices, Operational, Freight, Additional) |
| National Code       | Single select    | Country or region code for the charge item                                       |
| Active?             | Checkbox         | Indicates whether the charge item is currently available                         |
| Description         | Long text        | Detailed description of the charge item                                          |
| Charge items        | Linked record    | Connection to taxable charge item records (**🔴 Charge Items**)                  |
| Non-Taxable Charges | Linked record    | Connection to non-taxable charge item records (**🔵 Non-Taxable Charges**)       |
| Created Date        | Formula          | Record creation timestamp                                                        |
| Created By          | Formula          | User who created the record                                                      |
| Last Modified Time  | Formula          | Last update timestamp                                                            |
| Last Modified By    | Formula          | User who last updated the record                                                 |
| Dim(CM)             | Single line text | Dimensional specifications in centimeters                                        |
| ✏️ Debit Notes      | Linked record    | Connection to debit notes using this item                                        |
| ✏️ Debit Notes copy | Linked record    | Additional debit note connections                                                |

---

## 6. Bene (Local Table)

Stores beneficiary bank account information used for receiving payments on debit notes.

| Field Name           | Type             | Description                                    |
| -------------------- | ---------------- | ---------------------------------------------- |
| Bene ID              | Single line text | Unique identifier for beneficiary account      |
| Bene's A/C No.       | Single line text | Bank account number for the beneficiary        |
| Bene's A/C With Bank | Single line text | Name of the beneficiary's bank                 |
| Full Address         | Single line text | Complete address of the beneficiary or bank    |
| Swift Code           | Single line text | International bank identifier code             |
| Bene Name            | Single line text | Full name of the account beneficiary           |
| Debit Notes          | Linked record    | Connection to debit notes using this account   |
| Created Date         | Formula          | Record creation timestamp                      |
| Created By           | Formula          | User who created the record                    |
| Last Modified Time   | Formula          | Last update timestamp                          |
| Last Modified By     | Formula          | User who last updated the record               |
| Notes                | Long text        | Additional notes about the beneficiary account |

---

## 7. Orders(OMS) (External Table)

**(External Table)** – Synced from the OMS (Order Management System).  
Provides order-level operational data used by FIN for revenue, cost, and debit note linkage.

---

## 8. Quotations(CRM) (External Table)

**(External Table)** – Synced from the CRM base.  
Provides quotation-level financial and routing data used as a reference for debit notes and profit analysis.

---

## 9. AIRWAYBILL/POD(OMS) (External Table)

**(External Table)** – Synced from OMS airwaybill / POD records.  
Provides shipment airwaybill-level data used as reference in FIN and debit notes.

---

## 10. Staffs(CRM) (External Table)

**(External Table)** – Synced from the CRM Staffs table.  
Provides staff identity information used for responsibility and attribution in FIN records.

## Relationship Diagram (Text Summary)

### One-to-Many Relationships

### Many-to-Many Relationships

---
