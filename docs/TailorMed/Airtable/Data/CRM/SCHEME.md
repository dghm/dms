---
sidebar_position: 2
---

# Schema

This document outlines the full schema design of the TailorMed CRM Base, including tables, fields, data types, and relationship structure.
All tables marked (Local Table) are created and maintained within this CRM base.
This schema serves as the foundation for customer management, quotation management, and logistics planning workflows.

## Base Information

- **Base Name**: 【TailorMed】CRM
- **Base ID**: appRjtQd5y7Q0hYUu
- **Total Tables**: 10

## 1. Partners (Local Table)

Master table for all business partners, including clients, agents, shippers, and consignees.

| Field Name           | Type                       | Description                                 |
| -------------------- | -------------------------- | ----------------------------------------------- |
| Partner Name         | Single line text (Primary) | Company or organization name                    |
| Role                 | Multiple select            | Business relationship type (e.g. Client, Agent) |
| City/Country         | Linked record              | Geographic location (link to **Locations**)     |
| Address              | Long text                  | Complete business address                       |
| Tax ID / VAT Number  | Single line text           | Tax identification number                       |
| Main Phone           | Single line text           | Primary contact telephone                       |
| Main Email           | Single line text           | Primary contact email                           |
| Payment Terms        | Single select              | Payment schedule preferences (e.g. Net 30)      |
| Closing Date         | Single select              | Billing cycle timing                            |
| Active               | Single select              | Current partnership status                      |
| Notes                | Long text                  | Additional partner information                  |
| Primary Contact      | Linked record              | Main contact person (link to **ATTNs**)         |
| Full Name            | Single line text           | Complete company legal name                     |
| Prefered Shipp Dist. | Long text                  | Preferred shipping destination                  |
| Quotations           | Linked record              | Associated **✏️ Quotations**                    |
| #                    | Autonumber                 | System-generated sequence                       |
| ID                   | Single line text           | Formatted partner identifier                    |
| Full Name            | Long text                  | Chinese company name                            |
| Address              | Long text                  | Chinese business address                        |
| Created Date         | Date                       | Record creation timestamp                       |
| Created By           | Formula                    | Record creator identification                   |
| Last Modified Time   | Date                       | Last update timestamp                           |
| Last Modified By     | Formula                    | Last modifier identification                    |
| Shipper/Consignee    | Single line text           | Shipping role designation                       |
| Agents               | Single line text           | Associated agent information                    |

---

## 2. Contacts (Local Table)

Stores shipment-related contact entities used as shipper or consignee details for quotations and logistics documents.

| Field Name            | Type                       | Description                                   |
| --------------------- | -------------------------- | --------------------------------------------- |
| Shipper/Consignee     | Single line text (Primary) | Contact identifier (often a formula output)   |
| Contact person        | Linked record              | Link to detailed contact (**ATTNs**)          |
| Mobile                | Long text                  | Mobile phone number                           |
| Role                  | Single select              | Contact's shipping role (Shipper / Consignee) |
| Created Date          | Date                       | Record creation timestamp                     |
| Created By            | Formula                    | Record creator identification                 |
| Last Modified Time    | Date                       | Last update timestamp                         |
| Last Modified By      | Formula                    | Last modifier identification                  |
| Phone                 | Long text                  | Business phone number                         |
| Email                 | Long text                  | Email address                                 |
| English Address       | Single line text           | Address in English                            |
| Related Partner       | Single line text           | Associated partner information (text only)    |
| Related Quotations    | Linked record              | Connected **✏️ Quotations**                   |
| Notes                 | Long text                  | Additional contact notes                      |
| Related ATTNs         | Linked record              | Detailed contact references (**ATTNs**)       |
| Chinese Address       | Single line text           | Address in Chinese                            |
| ✏️ Quotations         | Linked record              | Quotation associations                        |
| Co. Name Abbreviation | Single line text           | Company name abbreviation                     |

---

## 3. ATTNs (Local Table)

Human-level contact directory representing individual contact persons associated with partners or shipment contacts.

| Field Name                   | Type                       | Description                                    |
| ---------------------------- | -------------------------- | ---------------------------------------------- |
| ATTN Name                    | Single line text (Primary) | Contact name display                           |
| Title / Position             | Long text                  | Professional title                             |
| Email                        | Long text                  | Primary email address                          |
| Phone (Direct)               | Long text                  | Direct telephone line                          |
| Mobile                       | Long text                  | Mobile telephone number                        |
| Notes                        | Long text                  | Contact-specific information                   |
| Created Date                 | Date                       | Record creation timestamp                      |
| Name                         | Single line text           | Full contact name (raw input)                  |
| Partner                      | Linked record              | Associated business partner (**Partners**)     |
| Related Contacts             | Linked record              | Contact relationship references (**Contacts**) |
| #                            | Autonumber                 | System-generated sequence                      |
| ID                           | Single line text           | Formatted contact identifier                   |
| Created By                   | Formula                    | Record creator identification                  |
| Last Modified Time           | Date                       | Last update timestamp                          |
| Last Modified By             | Formula                    | Last modifier identification                   |
| Contacts                     | Linked record              | Contact record connections                     |
| Role (from Partner)          | Multiple select            | Partner role lookup                            |
| Role(From Contacts)          | Multiple select            | Contact role lookup                            |
| Related ✏️ Quotations        | Linked record              | Quotation references                           |
| ✏️ Quotations                | Linked record              | Direct quotation links                         |
| Related ✏️ Quotations copy   | Linked record              | Quotation copy references                      |
| Related ✏️ Quotations copy 2 | Single line text           | Additional quotation references                |

---

## 4. Locations (Local Table)

Standardized geographic locations used for partner addresses, routing information, and location-based filtering.

| Field Name         | Type                       | Description                              |
| ------------------ | -------------------------- | ---------------------------------------- |
| Location Name      | Single line text (Primary) | Geographic location identifier           |
| Country            | Single select              | Country designation                      |
| City               | Single line text           | City name                                |
| ISO Country Code   | Single line text           | Standard country code                    |
| Note               | Long text                  | Location-specific information            |
| Created Date       | Date                       | Record creation timestamp                |
| Created By         | Formula                    | Record creator identification            |
| Last Modified Time | Date                       | Last update timestamp                    |
| Last Modified By   | Formula                    | Last modifier identification             |
| Related Partners   | Linked record              | Partners in this location (**Partners**) |

---

## 5. 🟨 Package Items (Local Table)

Contains detailed package-level item specifications used in quotations, including dimensions, weight, container type, and temperature requirements.

| Field Name        | Type                       | Description                              |
| ----------------- | -------------------------- | ---------------------------------------- |
| Box Type          | Single line text (Primary) | Container type identifier                |
| Container         | Linked record              | Container specification reference        |
| Temp Req.         | Single select              | Temperature requirement specification    |
| Dim(CM)           | Single line text           | Package dimensions in centimeters        |
| Data Logger No.   | Single line text           | Temperature monitoring device identifier |
| Gross Weight      | Number                     | Total package weight                     |
| Volume Weight     | Number                     | Calculated volumetric weight             |
| Chargeable Weight | Number                     | Billing weight calculation               |
| Item Description  | Long text                  | Detailed contents description            |
| Batch/Lot Number  | Single line text           | Product batch identification             |
| Quantity          | Long text                  | Item quantity specification              |
| Unit              | Single select              | Measurement unit                         |
| Quotations        | Linked record              | Associated **✏️ Quotations**             |
| Temp Req. TXT     | Single line text           | Temperature requirement text display     |
| Created Date      | Date                       | Record creation timestamp                |
| Created By        | Formula                    | Record creator identification            |
| Last Modified     | Date                       | Last update timestamp                    |
| Last Modified By  | Formula                    | Last modifier identification             |
| Notes             | Long text                  | Package-specific notes                   |
| Quotations copy   | Single line text           | Quotation reference copy                 |

---

## 6. ✏️ Quotations (Local Table)

Primary table for storing quotation records, covering requester information, routing, package details, cost breakdown, and tax calculations.

| Field Name                   | Type                       | Description                               |
| ---------------------------- | -------------------------- | ----------------------------------------- |
| Job No.                      | Single line text (Primary) | Unique quotation identifier               |
| Requester                    | Linked record              | Requesting company (**Partners**)         |
| Currency                     | Single select              | Quotation currency                        |
| Net Amount                   | Number                     | Total quotation amount (net)              |
| Status                       | Single select              | Quotation processing status               |
| Attachment                   | Attachment                 | Quotation document files                  |
| Notes                        | Long text                  | Quotation-specific notes                  |
| Created Date                 | Date                       | Record creation timestamp                 |
| Last Modified Time           | Date                       | Last update timestamp                     |
| #                            | Single line text           | Reference number                          |
| 🔴 Charge Items              | Linked record              | Taxable charge line items                 |
| Effective Date               | Date                       | Quotation validity start date             |
| Expiration Date              | Single line text           | Quotation validity end date               |
| Requester Position           | Long text                  | Contact person's title                    |
| Requester Add                | Long text                  | Requester's address                       |
| Requester Person             | Linked record              | Primary contact for quotation (**ATTNs**) |
| Phone (Direct)               | Long text                  | Contact's direct phone                    |
| Payment Terms                | Multiple select            | Payment condition requirements            |
| POL                          | Single select              | Port of loading designation               |
| Origin/Destination           | Single line text           | Shipping route summary                    |
| Package Count                | Number                     | Total number of packages                  |
| Estimated Weight (KG)        | Number                     | Total estimated weight                    |
| Collection Co.               | Linked record              | Pickup service provider (**Partners**)    |
| Collection Address           | Single line text           | Pickup location                           |
| Delivery Co.                 | Linked record              | Delivery service provider (**Partners**)  |
| Delivery Address             | Single line text           | Delivery destination                      |
| No-Taxable Charge Net Amount | Number                     | Non-taxable charges total                 |
| 🔵 Non-Taxable Charges       | Linked record              | Non-taxable charge line items             |
| Collection Co. ATTN          | Linked record              | Pickup contact person (**ATTNs**)         |
| VAT                          | Number                     | Tax rate percentage                       |
| Total Amount                 | Number                     | Final total amount (before tax)           |
| Total Amount(VAT)            | Number                     | Tax-inclusive total                       |
| Prepared by                  | Linked record              | Quotation preparer reference (**Staffs**) |
| Prep. Co. Name               | Long text                  | Preparer's company name                   |
| Prep. Co. Add.               | Single line text           | Preparer's company address                |
| Preparer's Email             | Single line text           | Preparer's contact email                  |
| VAT included                 | Number                     | Tax amount calculation                    |
| Quotation Description        | Long text                  | Detailed service description              |

---

## 7. 🔴 Charge Items (Local Table)

Taxable charge-line table referencing catalog fee items applied to a quotation.

| Field Name         | Type                       | Description                                 |
| ------------------ | -------------------------- | ------------------------------------------- |
| Items              | Single line text (Primary) | Charge item identifier                      |
| Charge Items       | Linked record              | Catalog item reference (**Charge Catalog**) |
| Description        | Long text                  | Charge item description                     |
| Quantity           | Number                     | Item quantity                               |
| Manual Price       | Number                     | Override unit price                         |
| Subtotal           | Number                     | Line item total calculation                 |
| Notes              | Long text                  | Item-specific notes                         |
| Quotations No.     | Linked record              | Associated **✏️ Quotations**                |
| Unit               | Multiple select            | Unit of measurement                         |
| Default Price      | Number                     | Standard catalog price                      |
| Created Date       | Date                       | Record creation timestamp                   |
| Created By         | Formula                    | Record creator identification               |
| Last Modified Time | Date                       | Last update timestamp                       |
| Last Modified By   | Formula                    | Last modifier identification                |
| Unit Price TXT     | Number                     | Unit price display value                    |

---

## 8. 🔵 Non-Taxable Charges (Local Table)

Non-taxable fee-line table referencing catalog fee items applied to a quotation.

| Field Name         | Type                       | Description                                 |
| ------------------ | -------------------------- | ------------------------------------------- |
| Items              | Single line text (Primary) | Non-taxable item identifier                 |
| Charge Items       | Linked record              | Catalog item reference (**Charge Catalog**) |
| Description        | Long text                  | Item description                            |
| Quantity           | Number                     | Item quantity                               |
| Unit Price         | Number                     | Unit price                                  |
| Subtotal           | Number                     | Line total calculation                      |
| Notes              | Long text                  | Item-specific notes                         |
| Quotations         | Linked record              | Associated **✏️ Quotations**                |
| Unit               | Multiple select            | Unit of measurement                         |
| Created Date       | Date                       | Record creation timestamp                   |
| Created By         | Formula                    | Record creator identification               |
| Last Modified Time | Date                       | Last update timestamp                       |
| Last Modified By   | Formula                    | Last modifier identification                |

---

## 9. Staffs (Local Table)

Directory of TailorMed internal staff responsible for preparing quotations and handling CRM records.

| Field Name            | Type                       | Description                   |
| --------------------- | -------------------------- | ----------------------------- |
| Name                  | Single line text (Primary) | Staff member name             |
| Job Title             | Single line text           | Position title                |
| Email                 | Single line text           | Work email address            |
| Mobile                | Single line text           | Mobile phone number           |
| Address               | Single line text           | Work address                  |
| Company Name          | Long text                  | Employer organization         |
| Related ✏️ Quotations | Linked record              | Quotations prepared by staff  |
| #                     | Autonumber                 | System-generated sequence     |
| ID                    | Single line text           | Formatted staff identifier    |
| Created Date          | Date                       | Record creation timestamp     |
| Created By            | Formula                    | Record creator identification |
| Last Modified Time    | Date                       | Last update timestamp         |
| Last Modified By      | Formula                    | Last modifier identification  |

---

## 10. Charge Catalog(FIN) (External Table)

This table is a **read-only external dataset** synced from the FIN Base and does not belong to the local CRM structure.  
It provides a centralized reference list of service items and pricing used across TailorMed’s financial and logistics workflows.

Within the CRM, this catalog is intended **solely for price lookup and item selection** when preparing quotations.  
It ensures that users can reference:

- Standardized service items
- Container and packaging fees
- Operational and handling charges
- Additional surcharges

The table supports quotation creation by enabling consistent pricing, reducing manual entry errors, and maintaining a single source of truth shared between the CRM and FIN systems.

Because this dataset is externally maintained, **no schema fields are listed here**, and all updates must be performed in the FIN Base.

---

## Relationship Diagram (Text Summary)

### One-to-Many Relationships

- **Partners → ATTNs**

  - Type: One-to-Many
  - Linking Fields: `ATTNs.Partner` → `Partners`
  - Description: Each partner can have multiple contact persons.

- **Partners → ✏️ Quotations**

  - Type: One-to-Many
  - Linking Fields: `✏️ Quotations.Requester` → `Partners`
  - Description: Each partner can request multiple quotations.

- **✏️ Quotations → 🔴 Charge Items**

  - Type: One-to-Many
  - Linking Fields: `🔴 Charge Items.Quotations No.` → `✏️ Quotations`
  - Description: Each quotation contains multiple taxable charge items.

- **✏️ Quotations → 🔵 Non-Taxable Charges**

  - Type: One-to-Many
  - Linking Fields: `🔵 Non-Taxable Charges.Quotations` → `✏️ Quotations`
  - Description: Each quotation contains multiple non-taxable charge items.

- **✏️ Quotations → 🟨 Package Items**

  - Type: One-to-Many
  - Linking Fields: `🟨 Package Items.Quotations` → `✏️ Quotations`
  - Description: Each quotation specifies multiple package items.

- **Locations → Partners**

  - Type: One-to-Many
  - Linking Fields: `Partners.City/Country` → `Locations`
  - Description: Each location can have multiple partners.

- **Staffs → ✏️ Quotations**

  - Type: One-to-Many
  - Linking Fields: `✏️ Quotations.Prepared by` → `Staffs`
  - Description: Each staff member can prepare multiple quotations.

- **Charge Catalog(FIN) → 🔴 Charge Items**

  - Type: One-to-Many
  - Linking Fields: `🔴 Charge Items.Charge Items` → `Charge Catalog(FIN)`
  - Description: Each catalog item can be used in multiple charge line items.

- **Charge Catalog(FIN) → 🔵 Non-Taxable Charges**

  - Type: One-to-Many
  - Linking Fields: `🔵 Non-Taxable Charges.Charge Items` → `Charge Catalog(FIN)`
  - Description: Each catalog item can be used in multiple non-taxable charges.

- **Charge Catalog(FIN) → 🟨 Package Items**
  - Type: One-to-Many
  - Linking Fields: `🟨 Package Items.Container` → `Charge Catalog(FIN)`
  - Description: Each catalog container type can be used in multiple package items.

### Many-to-Many Relationships

- **ATTNs ↔ Contacts**

  - Type: Many-to-Many
  - Linking Fields: `ATTNs.Related Contacts` ↔ `Contacts.Related ATTNs`
  - Description: Contact persons can link to multiple contact entities and vice versa.

- **ATTNs ↔ ✏️ Quotations**

  - Type: Many-to-Many
  - Linking Fields: `ATTNs.Related ✏️ Quotations` ↔ `✏️ Quotations.Requester Person`
  - Description: Contact persons can be involved in multiple quotations.

- **Contacts ↔ ✏️ Quotations**
  - Type: Many-to-Many
  - Linking Fields: `Contacts.✏️ Quotations` ↔ `✏️ Quotations` (contact-related link field)
  - Description: Contact entities can be associated with multiple quotations.

---
