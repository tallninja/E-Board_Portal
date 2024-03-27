/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 3/18/24 : 11:26 AM
 */
package com.bobgroganconsulting.eboardportal.mapping;

import com.bobgroganconsulting.eboardportal.domain.entities.Document;
import com.bobgroganconsulting.eboardportal.dtos.BlobFile;
import com.bobgroganconsulting.eboardportal.dtos.query.DocumentDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface DocumentMapper {

    DocumentDto toDocumentDto(Document document);
    Document toDocument(BlobFile blobFile);

}
