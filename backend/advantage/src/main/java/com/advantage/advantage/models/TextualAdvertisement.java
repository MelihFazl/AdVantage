package com.advantage.advantage.models;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;


@Entity
@Table(name="textual_advertisement")
public class TextualAdvertisement extends Advertisement{
    @Getter @Setter String adText;

}
