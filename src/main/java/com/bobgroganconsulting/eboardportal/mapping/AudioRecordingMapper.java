/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 3/18/24 : 11:26 AM
 */
package com.bobgroganconsulting.eboardportal.mapping;

import com.bobgroganconsulting.eboardportal.domain.entities.AudioRecording;
import com.bobgroganconsulting.eboardportal.dtos.BlobFile;
import com.bobgroganconsulting.eboardportal.dtos.query.AudioRecordingDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AudioRecordingMapper {

    AudioRecordingDto toAudioRecordingDto(AudioRecording audioRecording);
    AudioRecording toAudioRecording(BlobFile blobFile);

}
