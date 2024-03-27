package com.advantage.advantage.repositories;

import com.advantage.advantage.models.Company;
import com.advantage.advantage.models.CompanySubscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import java.util.List;

@RepositoryRestResource
public interface CompanySubscriptionRepo extends JpaRepository<CompanySubscription, Long> {

    public List<CompanySubscription> findBySubscriptionId(long subscriptionId);
    public CompanySubscription deleteBySubscriptionId(long subscriptionId);
}
