package com.advantage.advantage.controllers;

import com.advantage.advantage.models.AdCategory;
import com.advantage.advantage.models.SingleAdAnalysisReport;
import com.advantage.advantage.models.TeamMember;
import com.advantage.advantage.models.TextualAdvertisement;
import com.advantage.advantage.services.SingleAnalysisAdReportService;
import com.advantage.advantage.services.TextualAdvertisementService;
import com.advantage.advantage.services.TextualAdvertisementServiceImplementation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/singleanalysisreport")
@CrossOrigin
public class SingleAnalysisReportController {
    @Autowired
    SingleAnalysisAdReportService repService;
    @Autowired

    TextualAdvertisementService textAdService;

    @PostMapping("/create")
    public String createSingleAnalysisReport(@RequestParam String title, @RequestParam long uploaderId, @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") Date createdAt,
                                             @RequestParam AdCategory category, @RequestParam String adText) {
        SingleAdAnalysisReport newReport = new SingleAdAnalysisReport();
        if (title.equals("")) {
            return "Please enter valid title";
        }
        if (createdAt == null) {
            return "There is not valid date";
        }
        if (adText.equals("")) {
            return "Please enter valid advertisement text";
        }
        if (category == null) {
            return "Please specify an advertisement category";
        }
        TextualAdvertisement newAd= textAdService.saveAdvertisement(category, uploaderId, createdAt, adText);
        if(repService.saveAdAnalysisReport(title, uploaderId, createdAt, "", "", "", 0, newAd ) != null){
            return "Advertisement saved successfully!";
        }
        return "There is an error";
    }
}
