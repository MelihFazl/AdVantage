package com.advantage.advantage.repositories;

import com.advantage.advantage.models.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface SingleAnalysisReportRepo  extends JpaRepository<SingleAdAnalysisReport, Long>{
        public List<SingleAdAnalysisReport> findAll();

        public List<SingleAdAnalysisReport> findByTeam_TeamId(Long teamId);

        public List<SingleAdAnalysisReport> findByReportId(long reportId);

        public List<SingleAdAnalysisReport> findByUploaderId(long uploaderId);
        public List<SingleAdAnalysisReport>  findByTitle(String title);
        public List<SingleAdAnalysisReport> findByCreatedAt(Date createdAt);
        public List<SingleAdAnalysisReport> findByAdvertisement(Advertisement advertisement);
        public boolean deleteByReportId(long reportId);

        public List<SingleAdAnalysisReport> findByPros(String pros);
        public List<SingleAdAnalysisReport> findByCons(String cons);
        public List<SingleAdAnalysisReport> findByOverview(String overview);
        public List<SingleAdAnalysisReport> findBySuccessPrediction(float pred);




}
