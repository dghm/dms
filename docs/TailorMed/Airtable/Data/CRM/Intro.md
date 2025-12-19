---
sidebar_position: 1
---

# Introduction

The TailorMed CRM Base serves as the central system for managing customer, partner, and quotation data across TailorMed’s cold-chain logistics operations.  
Designed to provide a structured and reliable foundation for business workflows, the CRM consolidates core entities—such as partners, contacts, quotations, charge items, and package specifications—into a cohesive data model that supports both operational processes and financial consistency.

This CRM is closely integrated with TailorMed’s broader system architecture.  
While most tables are maintained locally within the CRM, key pricing references are sourced from the external FIN Base to ensure alignment with corporate financial standards. Through this design, the CRM ensures:

- Consistent pricing and service item usage across all quotations
- Clear relationships between partners, contacts, and shipment requirements
- Accurate documentation of package details, temperature requirements, and routing information
- Enhanced traceability across quotation preparation and approval flows
- A single source of truth for customer-facing information

The schema documented in this file outlines each table, its fields, relationships, and intended business purpose. It is intended for internal stakeholders, system maintainers, and future integration planning, providing transparency and stability as TailorMed expands its digital platform.
