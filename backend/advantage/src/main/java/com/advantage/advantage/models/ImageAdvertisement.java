package com.advantage.advantage.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="image_advertisement")
public class ImageAdvertisement extends Advertisement{
    @Getter
    @Setter
    String imageKey;
}
