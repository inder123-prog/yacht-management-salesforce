const fs = require('fs');
const path = require('path');

const sampleYachts = {
    "records": [
        {
            "attributes": {
                "type": "Account",
                "referenceId": "YachtRef1"
            },
            "Name": "Sea Breeze",
            "Type": "Customer",
            "Yacht_Length__c": 85,
            "Engine_Type__c": "Diesel",
            "Home_Port__c": "Miami Marina",
            "Monthly_Budget__c": 25000
        },
        {
            "attributes": {
                "type": "Account",
                "referenceId": "YachtRef2"
            },
            "Name": "Ocean Dream",
            "Type": "Customer",
            "Yacht_Length__c": 120,
            "Engine_Type__c": "Diesel",
            "Home_Port__c": "Fort Lauderdale",
            "Monthly_Budget__c": 45000
        }
    ]
};

const sampleExpenses = {
    "records": [
        {
            "attributes": {
                "type": "Opportunity",
                "referenceId": "ExpenseRef1"
            },
            "Name": "Fuel - September 2024",
            "Amount": 2800,
            "StageName": "Closed Won",
            "CloseDate": "2024-09-15",
            "Expense_Category__c": "Fuel",
            "Vendor_Name__c": "Marine Fuel Co",
            "AccountId": "@YachtRef1"
        },
        {
            "attributes": {
                "type": "Opportunity",
                "referenceId": "ExpenseRef2"
            },
            "Name": "Hull Cleaning",
            "Amount": 3200,
            "StageName": "Closed Won",
            "CloseDate": "2024-09-10",
            "Expense_Category__c": "Maintenance",
            "Vendor_Name__c": "Neptune Services",
            "AccountId": "@YachtRef1"
        }
    ]
};

const sampleCrew = {
    "records": [
        {
            "attributes": {
                "type": "Contact",
                "referenceId": "CrewRef1"
            },
            "FirstName": "John",
            "LastName": "Smith",
            "Email": "j.smith@seabreeze.com",
            "Position__c": "Captain",
            "AccountId": "@YachtRef1"
        }
    ]
};

// Write files
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

fs.writeFileSync(path.join(dataDir, 'sample-yachts.json'), JSON.stringify(sampleYachts, null, 2));
fs.writeFileSync(path.join(dataDir, 'sample-crew.json'), JSON.stringify(sampleCrew, null, 2));
fs.writeFileSync(path.join(dataDir, 'sample-expenses.json'), JSON.stringify(sampleExpenses, null, 2));

console.log('✅ Sample data files generated successfully!');