---
sidebar_position: 2
---

# Introduction

**Release Date:** 2025/12/05

The FIN database consolidates all financial data required throughout the company’s billing workflow.  
Its primary function is to **reconstruct information from Quotations, Orders, and AIRWAYBILL records into structured Debit Notes that can be issued to clients**.

The central table of this database is **Debit Notes**, which aggregates client details, shipment and order data, charge items, and billing components.  
This table serves as the foundation for generating the final Debit Note document used for invoicing.

---

## 1. Debit Notes (Primary Table)

Acts as the core billing summary that merges data from Quotations, Orders, and AIRWAYBILL.  
The information in this table directly defines the Debit Note’s printed output, including billable items, total charges, remittance details, and charge structure.

---

## 2. Charge Items (Taxable Billable Items)

Contains all items that are **taxable and billable to the client**.

Charge Items are linked to the Debit Notes table and are used to populate:

- Line-item descriptions
- Unit prices
- Quantities
- Applicable tax amounts
- Overall charge breakdown

---

## 3. Non-Taxable Charges (Actual / Pass-Through Expenses)

Stores items that are **non-taxable** or fall outside the standard pricing catalog, including:

- Pass-through expenses
- Third-party reimbursements
- Non-taxable service components

This separation ensures clarity between taxable and non-taxable items when generating a Debit Note.

---

## 4. Profit & Cost Summary

Provides a preliminary view of shipment-level or order-level profitability.  
The current version is a simplified model and **is not yet connected to actual cost data or inventory records**.

Potential future enhancements include:

- Integration with real cost data
- Packaging and refrigerant cost tracking
- Warehousing and transport cost
- Cost allocation and margin analysis models

---

## 5. Charge Catalog (Company Charge Master List)

Serves as the **standardized pricing reference** across the organization.  
This table is shared with both the CRM and OMS databases as a unified catalog for calculating fees.

Includes fields such as:

- Service category
- Billing unit
- Currency
- Standard rate

The goal is to maintain pricing consistency across all business modules.

---

## 6. Bene (Bank Remittance Information)

Stores the bank account information used in Debit Note printouts.  
Currently includes two accounts:

- TWD account
- USD account

The correct remittance information is automatically applied based on the Debit Note’s billing currency.

---

## 7. External Linked Tables

The following tables originate from other databases (CRM / OMS):

- **Quotations**
- **Staffs**
- **Orders**
- **AIRWAYBILL**

These tables are not maintained within the FIN database.  
Instead, they serve as reference sources that supply client details, shipment data, pricing logic, and order-related information necessary for constructing a complete Debit Note record.

---

The FIN database functions as **the final integration layer for billing**, ensuring that upstream operational data is transformed into a coherent, traceable, and properly structured financial document for client invoicing.
