# HealthPay.Afrika: Technical Architecture & Economic Model

## 1. Executive Summary
HealthPay.Afrika is a specialized Financial Operating System (FinOS) built to digitize and secure corporate healthcare benefits. By leveraging the **Stellar Blockchain**, we eliminate fund leakage, ensure 100% purpose-binding, and provide real-time settlement for healthcare providers.

## 2. The Tech Stack
* **Blockchain Layer:** Stellar Network (Testnet). Chosen for high-speed settlement (3-5s) and low transaction costs.
* **Application Layer:** Next.js 16 (Turbopack) hosted on Vercel Edge.
* **Interface Layer:** "Headless" WhatsApp Business API.
* **Security:** AES-256 encryption for environment variables; SSH-key based deployment.

## 3. The "Purpose-Bound" Asset Logic
Unlike traditional crypto-wallets, HealthPay assets are **Non-Withdrawable**.
* **Trustline Enforcement:** Users can only receive "HealthCoin" from the verified HealthPay Issuer.
* **Merchant Whitelisting:** Funds can only be sent to verified Healthcare Provider addresses.



## 4. Economic Architecture (The Profit Engine)
HealthPay operates on a dual-revenue model:

### A. SaaS Subscription (Monthly Recurring Revenue)
| Segment | Size | Pricing |
| :--- | :--- | :--- |
| **SME** | 1-10 Staff | R499 / month |
| **Growth** | 11-150 Staff | R2,500 - R5,000 / month |
| **Corporate** | 151+ Staff | R100 / employee / month |

*Example: A 200-person Corporate client yields **R20,000 MRR**.*

### B. The Rail Fee (Transactional Revenue)
A **1.5% processing fee** is programmatically deducted from every transaction and routed to the HealthPay Revenue Wallet. This ensures that as the ecosystem's velocity increases, so does our bottom line.

## 5. Security & Governance
* **No Private Key Custody:** Employees interact via WhatsApp; the server signs transactions in a secure environment.
* **Full Auditability:** Every cent is traceable on the public ledger, providing employers with instant audit reports via API.

---
**Status:** Pilot-Ready (Stellar Testnet)
**Purpose:** Healthcare Utility Only
**Withdrawals:** Disabled by Smart-Contract Logic
