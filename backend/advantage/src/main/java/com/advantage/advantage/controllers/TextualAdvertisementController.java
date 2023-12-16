package com.advantage.advantage.controllers;
import com.advantage.advantage.models.AdCategory;
import com.advantage.advantage.models.TextualAdvertisement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;
import com.advantage.advantage.services.*;
import com.advantage.advantage.repositories.*;
import com.advantage.advantage.helpers.*;


import java.util.Date;

@RestController
@RequestMapping("/advertisement")
@CrossOrigin
public class TextualAdvertisementController {
    @Autowired
    TextualAdvertisementService textAdService;

    @PostMapping("/create")
    public TextualAdvertisement createTextAdvertisement(@RequestParam AdCategory category, @RequestParam long uploaderId, @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") Date uploadedAt, @RequestParam String adText){
        return textAdService.saveAdvertisement(category, uploaderId, uploadedAt, adText);
    }

}
