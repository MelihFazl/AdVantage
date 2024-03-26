package com.advantage.advantage.services;

import com.advantage.advantage.helpers.IgnoredPropertyCreator;
import com.advantage.advantage.models.CompanySubscription;
import com.advantage.advantage.models.PaymentPeriodType;
import com.advantage.advantage.models.PaymentPlanType;
import com.advantage.advantage.repositories.CompanySubscriptionRepo;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.beans.BeanUtils;


import java.util.Date;
import java.util.List;
@Service
public class CompanySubscriptionServiceImplementation implements CompanySubscriptionService{
    private IgnoredPropertyCreator ignoredPropertyCreator;

    private final CompanySubscriptionRepo companySubscriptionRepo;
    @Autowired
    public CompanySubscriptionServiceImplementation(CompanySubscriptionRepo companySubscriptionRepo) {
        this.companySubscriptionRepo = companySubscriptionRepo;
    }

    @Override
    public List<CompanySubscription> getAllSubscriptions() {
        return companySubscriptionRepo.findAll();
    }

    @Override
    public List<CompanySubscription> getBySubscriptionId(long subscriptionId) {
        return companySubscriptionRepo.findBySubscriptionId(subscriptionId);
    }

    @Override
    public CompanySubscription saveSubscription( PaymentPlanType paymentPlanType, PaymentPeriodType paymentPeriodType,  Date startingSubscriptionDate) {
        CompanySubscription newCompanySubscription = new CompanySubscription();
        if(paymentPlanType == null){
            System.out.println("Please select valid Payment Plan Type");
            return null;
        }
        if(paymentPeriodType == null){
            System.out.println("Please select valid Payment Period Type");
            return null;
        }
        float price = calculatePrice(paymentPlanType, paymentPeriodType);
        Date nextRenewalDate = calculateNextRenevalDate( paymentPeriodType, startingSubscriptionDate);
        int usageLimit = calculateUsageLimit(paymentPlanType, paymentPeriodType);

        newCompanySubscription.setPaymentPlanType(paymentPlanType);
        newCompanySubscription.setPaymentPeriodType(paymentPeriodType);
        newCompanySubscription.setStartingSubscriptionDate(startingSubscriptionDate);
        newCompanySubscription.setPrice(price);
        newCompanySubscription.setNextRenewalDate(nextRenewalDate);
        newCompanySubscription.setUsageLimit(usageLimit);
        companySubscriptionRepo.save(newCompanySubscription);
        return newCompanySubscription;

    }

    @Override
    public CompanySubscription updateCompanySubscription(CompanySubscription editedCompanySubscription, long subscriptionId) {
        List<CompanySubscription> subscriptions= companySubscriptionRepo.findBySubscriptionId(subscriptionId);
        if(subscriptions == null || subscriptions.isEmpty())
        {
            return null;
        }
        else
        {
            CompanySubscription oldSubscription = subscriptions.get(0);
            ignoredPropertyCreator = IgnoredPropertyCreator.getInstance();
            ignoredPropertyCreator.setObj(editedCompanySubscription);
            String[] ignoredProperties = ignoredPropertyCreator.getNullPropertyNames();
            BeanUtils.copyProperties(editedCompanySubscription, subscriptionId, ignoredProperties);
            companySubscriptionRepo.save(oldSubscription);
            return oldSubscription;
        }
    }
    @Override
    public CompanySubscription deleteCompanySubscriptionById(long subscriptionId) {
        return companySubscriptionRepo.deleteBySubscriptionId(subscriptionId);
    }

    //It must be implemented later
    public float calculatePrice(PaymentPlanType paymentPlanType, PaymentPeriodType paymentPeriodType){
        return 1000;
    }
    //It must be implemented later
    public int calculateUsageLimit(PaymentPlanType paymentPlanType, PaymentPeriodType paymentPeriodType){
        return 1000;
    }
    //It must be implemented later
    public Date calculateNextRenevalDate( PaymentPeriodType paymentPeriodType, Date startingSubscriptionDate){
        Date renevalDate = startingSubscriptionDate;
        switch(paymentPeriodType) {
            case Annually:
                renevalDate.setYear(startingSubscriptionDate.getYear()+1);
                break;
            case Monthly:
                renevalDate.setMonth(startingSubscriptionDate.getMonth()+1);
                break;

        }
        return renevalDate;
    }

}
