package com.advantage.advantage.repositories;

import com.advantage.advantage.models.ShapleyValReportAssociation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface ShapleyValReportAssociationRepo extends JpaRepository<ShapleyValReportAssociation, Long> {

    public List<ShapleyValReportAssociation> findAll();

    public List<ShapleyValReportAssociation> findById(long id);

    public List<ShapleyValReportAssociation> findByReportId(long reportId);
}
