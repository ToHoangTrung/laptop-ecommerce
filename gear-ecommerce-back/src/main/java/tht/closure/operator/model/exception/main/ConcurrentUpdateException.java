package tht.closure.operator.model.exception.main;

import org.springframework.dao.OptimisticLockingFailureException;

public class ConcurrentUpdateException extends OptimisticLockingFailureException {

    public ConcurrentUpdateException(Long id, Class<?> clazz) {
        super(String.format(
                "This '%s' have id '%s' have been updated by someone else, please refresh to get the newest version",
                clazz.getName(), id ));
    }

    public ConcurrentUpdateException(String message) {
        super(message);
    }
}
