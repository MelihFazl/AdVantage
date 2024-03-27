package com.advantage.advantage.models;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name="subscription")
public class CompanySubscription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter private Long subscriptionId;
    @Getter @Setter private PaymentPlanType paymentPlanType;
    @Getter @Setter private PaymentPeriodType paymentPeriodType;
    @Getter @Setter private float price;
    @Getter @Setter private Date startingSubscriptionDate;
    @Getter @Setter private Date nextRenewalDate;
    @Getter @Setter private int usageLimit;

}
