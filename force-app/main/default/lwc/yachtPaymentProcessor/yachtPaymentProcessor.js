import { LightningElement, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class YachtPaymentProcessor extends LightningElement {
    @api recordId; // Invoice ID
    @api amount = 15800;
    @api invoiceNumber = 'INV-001';
    
    @track selectedPaymentMethod = '';
    @track isProcessing = false;
    @track showPaymentForm = false;
    @track paymentMethods = [
        { 
            label: 'Wire Transfer (ACH/SWIFT)', 
            value: 'Wire Transfer', 
            icon: 'utility:database', 
            description: 'Secure bank-to-bank transfer. 1-3 business days. Best for large amounts.',
            fee: 'Typically $15-45 fee'
        },
        { 
            label: 'Credit Card (Stripe)', 
            value: 'Credit Card', 
            icon: 'utility:payment_gateway', 
            description: 'Instant processing. 2.9% + $0.30 fee. Up to $50,000.',
            fee: '2.9% + $0.30'
        },
        { 
            label: 'PayPal', 
            value: 'PayPal', 
            icon: 'utility:socialshare', 
            description: 'International friendly. 2.9% fee. Instant processing.',
            fee: '2.9% fee'
        },
        { 
            label: 'ACH Payment', 
            value: 'ACH Payment', 
            icon: 'utility:bank', 
            description: 'US only. 0.8% fee. 1-3 business days.',
            fee: '0.8% (max $5)'
        }
    ];

    @track wireTransferInfo = {
        bankName: 'First National Marine Bank',
        routingNumber: '021000021',
        accountNumber: '****-****-8765',
        swiftCode: 'FNMBUSAA',
        beneficiaryName: 'Yacht Management Solutions LLC',
        reference: 'INV-001-REF'
    };

    // Account type options for ACH
    @track accountTypeOptions = [
        { label: 'Checking', value: 'Checking' },
        { label: 'Savings', value: 'Savings' }
    ];

    get isWireTransfer() {
        return this.selectedPaymentMethod === 'Wire Transfer';
    }

    get isCreditCard() {
        return this.selectedPaymentMethod === 'Credit Card';
    }

    get isPayPal() {
        return this.selectedPaymentMethod === 'PayPal';
    }

    get isACH() {
        return this.selectedPaymentMethod === 'ACH Payment';
    }

    get formattedAmount() {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(this.amount || 0);
    }

    handlePaymentMethodSelect(event) {
        this.selectedPaymentMethod = event.currentTarget.dataset.method;
        this.showPaymentForm = true;
    }

    handleBackToMethods() {
        this.showPaymentForm = false;
        this.selectedPaymentMethod = '';
    }

    async handleWireTransferConfirm() {
        this.isProcessing = true;
        
        try {
            // Simulate API call
            await this.delay(2000);

            this.showToast('Wire Transfer Instructions Sent', 
                'Bank details have been sent to your email. Payment typically processes within 1-3 business days.', 
                'success');

            this.resetForm();
        } catch (error) {
            this.showToast('Error', 'Failed to process wire transfer request', 'error');
        } finally {
            this.isProcessing = false;
        }
    }

    async handleStripePayment() {
        this.isProcessing = true;

        try {
            // Simulate Stripe payment processing
            await this.delay(3000);

            this.showToast('Payment Successful', 'Your credit card payment has been processed successfully.', 'success');
            this.resetForm();

        } catch (error) {
            this.showToast('Payment Failed', 'Credit card payment failed. Please try again.', 'error');
        } finally {
            this.isProcessing = false;
        }
    }

    async handlePayPalPayment() {
        this.isProcessing = true;

        try {
            // Simulate PayPal payment
            await this.delay(2500);

            this.showToast('PayPal Payment Successful', 'Your PayPal payment has been processed.', 'success');
            this.resetForm();

        } catch (error) {
            this.showToast('Payment Failed', 'PayPal payment failed. Please try again.', 'error');
        } finally {
            this.isProcessing = false;
        }
    }

    async handleACHPayment() {
        this.isProcessing = true;

        try {
            // Simulate ACH processing
            await this.delay(1500);

            this.showToast('ACH Payment Initiated', 'Your ACH payment is being processed. Funds will be transferred within 1-3 business days.', 'success');
            this.resetForm();

        } catch (error) {
            this.showToast('Payment Failed', 'ACH payment failed. Please try again.', 'error');
        } finally {
            this.isProcessing = false;
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    showToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({
            title,
            message,
            variant
        }));
    }

    resetForm() {
        this.showPaymentForm = false;
        this.selectedPaymentMethod = '';
    }

    copyToClipboard(event) {
        const textToCopy = event.target.dataset.copy;
        navigator.clipboard.writeText(textToCopy).then(() => {
            this.showToast('Copied', 'Copied to clipboard', 'success');
        });
    }
}
