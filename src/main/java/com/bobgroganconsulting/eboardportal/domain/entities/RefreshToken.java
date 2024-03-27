/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 3/15/24 : 8:45 AM
 */
package com.bobgroganconsulting.eboardportal.domain.entities;

import com.bobgroganconsulting.eboardportal.domain.entitylistener.RefreshTokenEntityListener;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.UUID;

@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "RefreshToken")
@Table(name = "refresh_tokens")
@EntityListeners(RefreshTokenEntityListener.class)
public class RefreshToken {

    @Id
    @Column(name = "token", nullable = false, updatable = false)
    private UUID token;

    @OneToOne
    @ToString.Exclude
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "user_id", nullable = false, updatable = false)
    private User user;

    @Column(name = "expires", nullable = false, updatable = false)
    private long expiresAt;

}
