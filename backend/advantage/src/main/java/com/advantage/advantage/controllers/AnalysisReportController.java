package com.advantage.advantage.controllers;

import com.advantage.advantage.models.AnalysisReport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.advantage.advantage.repositories.MultipleAnalysisReportRepo;
import com.advantage.advantage.repositories.SingleAnalysisReportRepo;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/analysisReport")
@CrossOrigin
public class AnalysisReportController {

    private final MultipleAnalysisReportRepo multipleAnalysisReportRepository;
    private final SingleAnalysisReportRepo singleAnalysisReportRepository;

    public AnalysisReportController(MultipleAnalysisReportRepo multipleAnalysisReportRepository, SingleAnalysisReportRepo singleAnalysisReportRepository) {
        this.multipleAnalysisReportRepository = multipleAnalysisReportRepository;
        this.singleAnalysisReportRepository = singleAnalysisReportRepository;
    }

    @GetMapping("/getAllByTeamId")
    public List<List<AnalysisReport>> getAllReports(@RequestParam long teamId)
    {
        List<List<AnalysisReport>> result = new ArrayList<>();

        result.add(singleAnalysisReportRepository.findByUploader_Team_TeamId(teamId));
        result.add(multipleAnalysisReportRepository.findByUploader_Team_TeamId(teamId));

        return result;
    }

}
