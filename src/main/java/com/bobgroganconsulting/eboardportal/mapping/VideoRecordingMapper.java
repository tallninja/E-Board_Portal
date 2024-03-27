/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 3/18/24 : 11:26 AM
 */
package com.bobgroganconsulting.eboardportal.mapping;

import com.bobgroganconsulting.eboardportal.domain.entities.VideoRecording;
import com.bobgroganconsulting.eboardportal.dtos.BlobFile;
import com.bobgroganconsulting.eboardportal.dtos.query.VideoRecordingDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface VideoRecordingMapper {

    VideoRecordingDto toVideoRecordingDto(VideoRecording videoRecording);
    VideoRecording toVideoRecording(BlobFile blobFile);

}
