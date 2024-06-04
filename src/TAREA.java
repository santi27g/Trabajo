import javax.swing.JLabel;
import javax.swing.JFrame;
import javax.swing.JPanel;
import java.awt.Color;
import java.awt.Font;
import javax.swing.SwingConstants;
import javax.swing.border.LineBorder;
import javax.swing.ImageIcon;
import javax.swing.JTextField;
import javax.swing.JButton;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.JTextArea;
import javax.swing.JScrollPane;
import java.awt.Toolkit;
import java.awt.event.KeyEvent;
import java.awt.event.KeyAdapter;

public class TAREA {

	private static JTextField textField;
	private static JTextField textField_1;
	private static JTextField textField_2;
	private static JTextField textField_3;
	
	public static void main(String[] args) {
		// TODO Auto-generated method stub

		JFrame venta = new JFrame();
		venta.setBackground(new Color(255, 0, 128));
		JPanel panel = new JPanel();
		Color colorin = new Color(0,0,150);
		Color colorin1 = new Color(60,60,60);

;		
		venta.setContentPane(panel);
		venta.setSize(800,600);
		venta.setLocationRelativeTo(null);
		venta.setResizable(false);
		venta.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		panel.setBackground(new Color(255, 255, 255));
		panel.setLayout(null);
		
		JPanel panel_1 = new JPanel();
		panel_1.setBorder(new LineBorder(new Color(255, 0, 0), 10));
		panel_1.setBounds(265, 86, 408, 43);
		panel.add(panel_1);
		panel_1.setBackground(colorin);
		
		JLabel lblNewLabel = new JLabel("Sumar numero");
		lblNewLabel.setIcon(null);
		lblNewLabel.setVerticalAlignment(SwingConstants.TOP);
		lblNewLabel.setHorizontalAlignment(SwingConstants.TRAILING);
		lblNewLabel.setFont(new Font("Times New Roman", Font.PLAIN, 11));
		lblNewLabel.setForeground(new Color(255, 255, 255));
		panel_1.add(lblNewLabel);
		
		JPanel panel_3 = new JPanel();
		panel_3.setBounds(324, 142, 277, 30);
		panel.add(panel_3);
		
		JLabel lblNewLabel_2_1 = new JLabel("Ingrese N1:");
		panel_3.add(lblNewLabel_2_1);
		
		textField = new JTextField();
		panel_3.add(textField);
		textField.setForeground(new Color(255, 255, 255));
		textField.setBackground(new Color(0, 128, 128));
		textField.setColumns(10);
		
		textField.addKeyListener(new KeyAdapter() {
			@Override
			public void keyTyped(KeyEvent teclaPulsada) {
				
				validacones.validarDouble(teclaPulsada, textField);
				 
				 
			}
		});
		JPanel panel_2 = new JPanel();
		panel_3.add(panel_2);
		panel_2.setBackground(new Color(64, 128, 128));
		
		
		
		JPanel panel_3_1 = new JPanel();
		panel_3_1.setBounds(324, 183, 277, 30);
		panel.add(panel_3_1);
		
		JLabel lblNewLabel_2_1_1 = new JLabel("Ingrese N2:");
		panel_3_1.add(lblNewLabel_2_1_1);
		
		textField_1 = new JTextField();
		textField_1.setForeground(Color.WHITE);
		textField_1.setColumns(10);
		textField_1.setBackground(new Color(0, 128, 128));
		panel_3_1.add(textField_1);
		
		textField_1.addKeyListener(new KeyAdapter() {
			@Override
			public void keyTyped(KeyEvent teclaPulsada) {
				
				validacones.validarDouble(teclaPulsada, textField_1);
				 
				 
			}
		});
		
	
		
		JPanel panel_4 = new JPanel();
		panel_4.setBackground(new Color(0, 255, 128));
		panel_4.setBounds(379, 258, 164, 43);
		panel.add(panel_4);
		
			
		JLabel lblNewLabel_3 = new JLabel();
		panel_4.add(lblNewLabel_3);
	
		
		JButton btnNewButton = new JButton("Calcular");
		btnNewButton.setBounds(418, 224, 89, 23);
		panel.add(btnNewButton);
		
		JLabel lblNewLabel_4 = new JLabel("");
		lblNewLabel_4.setIcon(new ImageIcon("C:\\Users\\Its-erma 03\\Desktop\\milei.jpg"));
		lblNewLabel_4.setBounds(317, 325, 244, 217);
		panel.add(lblNewLabel_4);
		
	
		
		JPanel panel_1_1 = new JPanel();
		panel_1_1.setBorder(new LineBorder(new Color(128, 0, 255), 10));
		panel_1_1.setBackground(new Color(255, 128, 255));
		panel_1_1.setBounds(25, 129, 211, 43);
		panel.add(panel_1_1);
		
		JLabel lblNombres = new JLabel("Nombres");
		lblNombres.setVerticalAlignment(SwingConstants.TOP);
		lblNombres.setHorizontalAlignment(SwingConstants.TRAILING);
		lblNombres.setForeground(new Color(0, 0, 0));
		lblNombres.setFont(new Font("Times New Roman", Font.PLAIN, 11));
		panel_1_1.add(lblNombres);
		
		JPanel panel_5 = new JPanel();
		panel_5.setBounds(35, 183, 193, 128);
		panel.add(panel_5);
		
		JLabel lblNewLabel_1 = new JLabel("Ingrese nombres:");
		panel_5.add(lblNewLabel_1);
		
		textField_2 = new JTextField();
		textField_2.setBackground(new Color(0, 128, 128));
		panel_5.add(textField_2);
		textField_2.setColumns(10);

		textField_2.addKeyListener(new KeyAdapter() {
			@Override
			public void keyTyped(KeyEvent teclaPulsada2) {
				
				validacones.validarNombre(teclaPulsada2, textField_2);
				 
				 
			}
		});
		JScrollPane scrollPane = new JScrollPane();
		scrollPane.setBounds(45, 325, 164, 181);
		panel.add(scrollPane);
		
		
		JTextArea textArea = new JTextArea();
		scrollPane.setViewportView(textArea);
		textArea.setEnabled(false);
		textArea.setEditable(false);
		textArea.setForeground(new Color(255, 255, 255));
		textArea.setBackground(new Color(0, 0, 0));
		
		JLabel lblNewLabel_2 = new JLabel("Ingrese edad:");
		panel_5.add(lblNewLabel_2);
		
		textField_3 = new JTextField();
		textField_3.setBackground(new Color(0, 128, 128));
		panel_5.add(textField_3);
		textField_3.setColumns(10);
		
		
		JButton btnNewButton_1 = new JButton("Guardar");
		panel_5.add(btnNewButton_1);
		

		btnNewButton_1.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent l) {
				String nombre = textField_2.getText();
				String edad = textField_3.getText();
				textArea.append("Nombre:"+nombre+"\nEdad:"+edad+"\n");
textField_3.setText("");
textField_2.setText("");
textField_2.requestFocus();

			}
		});

		

		JButton btnNewButton_2 = new JButton("cancelar");
		panel_5.add(btnNewButton_2);
		
		btnNewButton_2.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent j) {
				textField_3.setText("");
				textField_2.setText("");
				textField_2.requestFocus();
			
			}
		});
		
		
		btnNewButton.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				String texto = textField.getText();
				String texto1 = textField_1.getText();
				int n1 = Integer.parseInt(texto);
				int n2 = Integer.parseInt(texto1);
				int suma = n1 + n2;
				lblNewLabel_3.setText(String.valueOf(suma));
			}
		});
		
		venta.setVisible(true);
		
		
		
	}
}