package real_estate_web.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

// ─── Custom Exception ───────────────────────────────────────────────
class FAQNotFoundException extends RuntimeException {
    public FAQNotFoundException(Long id) {
        super("FAQ not found with id: " + id);
    }
}

class FAQAlreadyExistsException extends RuntimeException {
    public FAQAlreadyExistsException(String question) {
        super("FAQ already exists with question: " + question);
    }
}

// ─── Global Exception Handler ────────────────────────────────────────
@RestControllerAdvice
public class FAQExceptionHandler {

    @ExceptionHandler(FAQNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleFAQNotFound(FAQNotFoundException ex) {
        return buildError(HttpStatus.NOT_FOUND, ex.getMessage());
    }

    @ExceptionHandler(FAQAlreadyExistsException.class)
    public ResponseEntity<Map<String, Object>> handleFAQAlreadyExists(FAQAlreadyExistsException ex) {
        return buildError(HttpStatus.CONFLICT, ex.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationErrors(MethodArgumentNotValidException ex) {
        Map<String, String> fieldErrors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String field = ((FieldError) error).getField();
            fieldErrors.put(field, error.getDefaultMessage());
        });
        Map<String, Object> body = new HashMap<>();
        body.put("timestamp", LocalDateTime.now().toString());
        body.put("status", HttpStatus.BAD_REQUEST.value());
        body.put("error", "Validation Failed");
        body.put("fields", fieldErrors);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(body);
    }

    private ResponseEntity<Map<String, Object>> buildError(HttpStatus status, String message) {
        Map<String, Object> body = new HashMap<>();
        body.put("timestamp", LocalDateTime.now().toString());
        body.put("status", status.value());
        body.put("error", message);
        return ResponseEntity.status(status).body(body);
    }
}
