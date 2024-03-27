CREATE TABLE IF NOT EXISTS "users" (
    id UUID NOT NULL,
    first_name VARCHAR(20) NOT NULL,
    middle_name VARCHAR(20),
    last_name VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone_number VARCHAR(15) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS "meetings" (
    id UUID NOT NULL,
    title VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS "audio_recordings" (
    id UUID NOT NULL,
    meeting_id UUID NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_type VARCHAR(5) NOT NULL,
    file_size BIGINT NOT NULL,
    duration BIGINT,
    url VARCHAR(500),
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (meeting_id) REFERENCES "meetings"(id)
);

CREATE TABLE IF NOT EXISTS "video_recordings" (
    id UUID NOT NULL,
    meeting_id UUID NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_type VARCHAR(5) NOT NULL,
    file_size BIGINT NOT NULL,
    duration BIGINT,
    url VARCHAR(500),
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (meeting_id) REFERENCES "meetings"(id)
);

CREATE TABLE IF NOT EXISTS "documents" (
    id UUID NOT NULL,
    meeting_id UUID NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_type VARCHAR(5) NOT NULL,
    file_size BIGINT NOT NULL,
    pages BIGINT,
    url VARCHAR(500),
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (meeting_id) REFERENCES "meetings"(id)
);

CREATE TABLE IF NOT EXISTS "refresh_tokens" (
    token UUID NOT NULL,
    user_id UUID NOT NULL,
    expires BIGINT NOT NULL,
    PRIMARY KEY (token),
    FOREIGN KEY (user_id) REFERENCES "users"(id)
)