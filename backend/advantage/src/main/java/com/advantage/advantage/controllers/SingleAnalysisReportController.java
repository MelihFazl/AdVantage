package com.advantage.advantage.controllers;
import com.advantage.advantage.models.*;
import com.advantage.advantage.services.SingleAnalysisAdReportService;
import com.advantage.advantage.services.TextualAdvertisementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;
import java.util.Date;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<String> createSingleAnalysisReport(@RequestParam String title, @RequestParam long uploaderId, @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") Date createdAt,
                                                             @RequestParam AdCategory category, @RequestParam String adText) {
        if (title.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please enter a valid title");

        }

        if (createdAt == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("There is not a valid date");
        }

        if (adText.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please enter a valid advertisement text");
        }

        if (category == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please specify an advertisement category");
        }

        TextualAdvertisement newAd = textAdService.saveAdvertisement(category, uploaderId, createdAt, adText);

        if (newAd == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("There is an error saving the advertisement");
        }

        SingleAdAnalysisReport newReport = new SingleAdAnalysisReport();
        float prediction = (float) (Math.random() * 0.9999);
        if (repService.saveAdAnalysisReport(title, uploaderId, createdAt, "", "", "", prediction, newAd) != null) {
            return ResponseEntity.status(HttpStatus.OK).body("Advertisement and report saved successfully!");
        }

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("There is an error creating the report");
    }

    @GetMapping("/allreports")
    public List<SingleAdAnalysisReport> getAllReports()
    {
        return repService.getAllReports();
    }

    @GetMapping("/userreports")
    public List<SingleAdAnalysisReport> getReportsById(@RequestParam long uploaderId)
    {
        return repService.getByUploaderId(uploaderId);
    }
}
