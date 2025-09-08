import { LightningElement, track, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';
import YACHT_OBJECT from '@salesforce/schema/Account';
import MONTHLY_BUDGET_FIELD from '@salesforce/schema/Account.Monthly_Budget__c';
import CURRENT_LOCATION_FIELD from '@salesforce/schema/Account.Current_Location__c';

const fields = [MONTHLY_BUDGET_FIELD, CURRENT_LOCATION_FIELD];

export default class YachtDashboard extends LightningElement {
    @track metrics = {
        totalExpenses: 0,
        pendingInvoices: 0,
        activeYachts: 2,
        fuelEfficiency: 12.5,
        monthlyBudget: 25000,
        budgetUtilization: 63,
        overduePayments: 1,
        maintenanceAlerts: 3
    };
    
    @track isLoading = false;
    @track notifications = [
        {
            id: 1,
            type: 'warning',
            message: 'Hull inspection due in 5 days for Sea Breeze',
            priority: 'High'
        },
        {
            id: 2,
            type: 'info', 
            message: 'Fuel prices increased 8% at Miami Marina',
            priority: 'Medium'
        },
        {
            id: 3,
            type: 'success',
            message: 'Insurance renewal completed for Ocean Dream',
            priority: 'Low'
        }
    ];

    get totalExpenses() {
        return this.metrics.totalExpenses;
    }

    get pendingInvoices() {
        return this.metrics.pendingInvoices;
    }

    get activeYachts() {
        return this.metrics.activeYachts;
    }

    get fuelEfficiency() {
        return this.metrics.fuelEfficiency;
    }

    get budgetUtilization() {
        return this.metrics.budgetUtilization;
    }

    get budgetVariant() {
        if (this.metrics.budgetUtilization > 90) return 'error';
        if (this.metrics.budgetUtilization > 75) return 'warning';
        return 'success';
    }

    get overduePayments() {
        return this.metrics.overduePayments;
    }

    get maintenanceAlerts() {
        return this.metrics.maintenanceAlerts;
    }

    handleRefresh() {
        this.isLoading = true;
        // Simulate data refresh
        setTimeout(() => {
            this.metrics = {
                ...this.metrics,
                totalExpenses: Math.floor(Math.random() * 50000) + 10000,
                budgetUtilization: Math.floor(Math.random() * 40) + 60
            };
            this.isLoading = false;
        }, 1000);
    }

    handleNotificationDismiss(event) {
        const notificationId = event.target.dataset.id;
        this.notifications = this.notifications.filter(
            notification => notification.id != notificationId
        );
    }

    navigateToExpenses() {
        // Navigate to Opportunities
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Opportunity',
                actionName: 'list'
            }
        });
    }

    navigateToInvoices() {
        // Navigate to Invoices
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Yacht_Invoice__c',
                actionName: 'list'
            }
        });
    }
}
