package com.advantage.advantage.controllers;
import com.advantage.advantage.services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/mail")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/sendEmail")
    public void sendEmail(@RequestParam String to,  @RequestParam String subject,  @RequestBody String text) {
        emailService.sendSimpleMessage(to, subject, text);
    }
}

