package com.ssafy.notificationservice.config;

import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.auth.oauth2.GoogleCredentials;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;

@Component
public class FirebaseAppInitializer {

    @PostConstruct
    public void initializeFirebaseApp() {
        if (FirebaseApp.getApps().isEmpty()) {
            try {
                // 리소스 경로에서 파일을 읽어들임
                InputStream serviceAccount = getClass().getClassLoader().getResourceAsStream("firebase-adminsdk.json");

                if (serviceAccount == null) {
                    throw new IllegalArgumentException("Firebase service account file not found");
                }

                FirebaseOptions options = new FirebaseOptions.Builder()
                        .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                        .build();

                FirebaseApp.initializeApp(options);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
