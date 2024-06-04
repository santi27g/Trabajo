
import java.awt.Toolkit;
import java.awt.event.KeyEvent;
import javax.swing.JTextField;

public class validacones {
public static void validarDouble(KeyEvent teclaPulsada, JTextField txtNumero1) {
		
		char letra=teclaPulsada.getKeyChar();
		
		if (!Character.isDigit(letra) && letra!=8 && letra!= 46 && letra!= 45) {
			Toolkit.getDefaultToolkit().beep();
			teclaPulsada.consume();
		}
		 if (txtNumero1.getText().contains(".") && letra=='.') {
			 
				Toolkit.getDefaultToolkit().beep();
				teclaPulsada.consume();
			
		}
		
		 if (txtNumero1.getText().contains("-") && letra=='-') {
			 
				Toolkit.getDefaultToolkit().beep();
				teclaPulsada.consume();
			
		}
		 
		 
		 if (!txtNumero1.getText().isEmpty() && letra=='-') {
			 
				Toolkit.getDefaultToolkit().beep();
				teclaPulsada.consume();
			
		}
		 
		 if (txtNumero1.getText().isEmpty() && letra=='.') {
			 
				txtNumero1.setText("0");
			
		}
		
	}
	
	
	public static void validarLong(KeyEvent teclaPulsada, JTextField txtNumero1) {
		
		char letra=teclaPulsada.getKeyChar();
		
		// el número 8 es el backSpace
		// el número 45 es el -
		
		if (!Character.isDigit(letra) && letra!=8 && letra!= 45) {
			Toolkit.getDefaultToolkit().beep();
			teclaPulsada.consume();
		}
		 if (txtNumero1.getText().contains("-") && letra=='-') {
				Toolkit.getDefaultToolkit().beep();
				teclaPulsada.consume();	
		}
		 if (!txtNumero1.getText().isEmpty() && letra=='-') {
				Toolkit.getDefaultToolkit().beep();
				teclaPulsada.consume();	
		}
				 
		if (txtNumero1.getText().length()>19)  {
			Toolkit.getDefaultToolkit().beep();
			teclaPulsada.consume();
		} 	 
	}
	public static void validarNombre(KeyEvent teclaPulsada2, JTextField textField_2) {
		
		char letra = teclaPulsada2.getKeyChar();
		
		
		if (!Character.isLetter(letra) && letra!=8 && letra!= 32) {
			Toolkit.getDefaultToolkit().beep();
			teclaPulsada2.consume();
			}
	
	
	
	
	
	
	
	
	
	
	
	
	
}