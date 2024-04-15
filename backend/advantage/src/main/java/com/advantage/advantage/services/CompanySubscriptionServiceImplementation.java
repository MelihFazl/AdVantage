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


import java.util.Calendar;
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
    public CompanySubscription updateCompanySubscription(PaymentPlanType paymentPlanType, PaymentPeriodType paymentPeriodType,Date createdAt,   long subscriptionId) {
        List<CompanySubscription> subscriptions= companySubscriptionRepo.findBySubscriptionId(subscriptionId);
        if(subscriptions == null || subscriptions.isEmpty())
        {
            return null;
        }
        else
        {
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
            Date nextRenewalDate = calculateNextRenevalDate( paymentPeriodType,createdAt);
            int usageLimit = calculateUsageLimit(paymentPlanType, paymentPeriodType);

            newCompanySubscription.setPaymentPlanType(paymentPlanType);
            newCompanySubscription.setPaymentPeriodType(paymentPeriodType);
            newCompanySubscription.setStartingSubscriptionDate(createdAt);
            newCompanySubscription.setPrice(price);
            newCompanySubscription.setNextRenewalDate(nextRenewalDate);
            newCompanySubscription.setUsageLimit(usageLimit);

            CompanySubscription oldSubscription = subscriptions.get(0);
            ignoredPropertyCreator = IgnoredPropertyCreator.getInstance();
            ignoredPropertyCreator.setObj(newCompanySubscription);
            String[] ignoredProperties = ignoredPropertyCreator.getNullPropertyNames();
            BeanUtils.copyProperties(newCompanySubscription, oldSubscription, ignoredProperties);
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
        float price = 0;
        final float FREELANCER_DAY = 12;
        final float PROFESSIONAL_DAY = 16;
        final float AGENCY_DAY = 18;
        switch (paymentPlanType) {
            case Freelancer:
                switch (paymentPeriodType){
                    case Monthly :
                        price = FREELANCER_DAY * 30;
                        break;
                    case Annually:
                        price = FREELANCER_DAY * 350;
                        break;
                    default:break;
                }
            case Professional:
                switch (paymentPeriodType){
                    case Monthly :
                        price = PROFESSIONAL_DAY * 30;
                        break;
                    case Annually:
                        price = PROFESSIONAL_DAY * 350;
                        break;
                    default:break;
                }
            case Agency:
                switch (paymentPeriodType){
                    case Monthly :
                        price = AGENCY_DAY * 30;
                        break;
                    case Annually:
                        price = AGENCY_DAY * 350;
                        break;
                    default:break;
                }

        }
        return price;
    }
    //It must be implemented later
    public int calculateUsageLimit(PaymentPlanType paymentPlanType, PaymentPeriodType paymentPeriodType){
        int price = 0;
        final int FREELANCER_DAY = 10;
        final int PROFESSIONAL_DAY = 25;
        final int AGENCY_DAY = 40;
        switch (paymentPlanType) {
            case Freelancer:
                switch (paymentPeriodType){
                    case Monthly :
                        price = FREELANCER_DAY * 30;
                        break;
                    case Annually:
                        price = FREELANCER_DAY * 350;
                        break;
                    default:break;
                }
            case Professional:
                switch (paymentPeriodType){
                    case Monthly :
                        price = PROFESSIONAL_DAY * 30;
                        break;
                    case Annually:
                        price = PROFESSIONAL_DAY * 350;
                        break;
                    default:break;
                }
            case Agency:
                switch (paymentPeriodType){
                    case Monthly :
                        price = AGENCY_DAY * 30;
                        break;
                    case Annually:
                        price = AGENCY_DAY * 350;
                        break;
                    default:break;
                }

        }
        return price;
    }
    //It must be implemented later
    public Date calculateNextRenevalDate(PaymentPeriodType paymentPeriodType, Date startingSubscriptionDate) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(startingSubscriptionDate);

        switch (paymentPeriodType) {
            case Annually:
                calendar.add(Calendar.YEAR, 1);
                break;
            case Monthly:
                calendar.add(Calendar.MONTH, 1);
                break;
        }

        return calendar.getTime();
    }


}
