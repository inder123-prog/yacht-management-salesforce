import { LightningElement, wire, track } from 'lwc';
import getYachtMetrics from '@salesforce/apex/YachtAnalyticsController.getYachtMetrics';

export default class YachtDashboard extends LightningElement {
    @track metrics = {};
    @track isLoading = true;
    @track error;

    @wire(getYachtMetrics)
    wiredMetrics({ error, data }) {
        if (data) {
            this.metrics = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
        }
        this.isLoading = false;
    }

    get totalExpenses() {
        return this.metrics.totalExpenses || 0;
    }

    get pendingMaintenance() {
        return this.metrics.pendingMaintenance || 0;
    }

    get activeYachts() {
        return this.metrics.activeYachts || 0;
    }
}