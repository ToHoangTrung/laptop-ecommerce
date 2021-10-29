package tht.closure.operator.model.dto.main;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class ExceptionResponse {

    private String message;

    private String errorCode;

    private HttpStatus httpStatus;

    List<String> errors = new ArrayList<>();

    public ExceptionResponse(String message, String errorCode, HttpStatus httpStatus) {
        this.message = message;
        this.errorCode = errorCode;
        this.httpStatus = httpStatus;
    }

    public ExceptionResponse(String message, String errorCode, HttpStatus httpStatus, List<String> errors) {
        this.message = message;
        this.errorCode = errorCode;
        this.httpStatus = httpStatus;
        this.errors = errors;
    }
}
