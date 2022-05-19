
public class ParameterExceptionTest {
    @Test(expected = RuntimeException.class)
    public void ParameterException(String paramName, Template template) {
        super("Parameter '" + paramName + "' not supported by Template '" + template.toString() + "'");
    }
}