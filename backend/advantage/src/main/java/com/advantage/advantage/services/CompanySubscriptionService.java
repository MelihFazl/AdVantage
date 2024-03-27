package com.advantage.advantage.services;

import com.advantage.advantage.models.Company;
import com.advantage.advantage.models.CompanySubscription;
import com.advantage.advantage.models.PaymentPeriodType;
import com.advantage.advantage.models.PaymentPlanType;

import java.util.Date;
import java.util.List;

public interface CompanySubscriptionService {
    public List<CompanySubscription> getAllSubscriptions();

    public List<CompanySubscription> getBySubscriptionId(long subscriptionId);

    public CompanySubscription saveSubscription(PaymentPlanType paymentPlanType, PaymentPeriodType paymentPeriodType, Date startingSubscriptionDate );

    public CompanySubscription updateCompanySubscription(CompanySubscription editedCompanySubscription, long subscriptionId);

    public CompanySubscription deleteCompanySubscriptionById(long subscriptionId);
}
