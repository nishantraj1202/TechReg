import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import * as Animatable from 'react-native-animatable';

const insuranceSchemes = [
  {
    name: "Health Shield Plus",
    coverage: "₹5,00,000",
    premium: "₹2,499/year",
    benefits: ["Cashless treatment", "No medical checkup required", "24x7 support"]
  },
  {
    name: "Family Care Pro",
    coverage: "₹10,00,000",
    premium: "₹4,999/year",
    benefits: ["Covers spouse and 2 children", "Maternity benefits", "Annual health checkup"]
  }
];

const loanSchemes = [
  {
    name: "Quick Cash Loan",
    amount: "Up to ₹50,000",
    interest: "12% p.a.",
    tenure: "3-12 months"
  },
  {
    name: "Business Growth Loan",
    amount: "Up to ₹2,00,000",
    interest: "14% p.a.",
    tenure: "6-24 months"
  }
];

export default function ChatbotAssistant() {
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your GigMate Assistant. How can I help you today?", isBot: true }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en-IN');

  const handleUserInput = async (text) => {
    if (!text.trim()) return;

    const userMessage = { text, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Simple keyword-based responses
    let botResponse = "";
    const lowerText = text.toLowerCase();

    if (lowerText.includes('insurance')) {
      botResponse = "Here are our insurance schemes:\n\n" + 
        insuranceSchemes.map(scheme => 
          `${scheme.name}\n• Coverage: ${scheme.coverage}\n• Premium: ${scheme.premium}\n• Benefits: ${scheme.benefits.join(', ')}\n`
        ).join('\n');
    } else if (lowerText.includes('loan')) {
      botResponse = "Here are our loan options:\n\n" + 
        loanSchemes.map(loan => 
          `${loan.name}\n• Amount: ${loan.amount}\n• Interest: ${loan.interest}\n• Tenure: ${loan.tenure}\n`
        ).join('\n');
    } else if (lowerText.includes('kyc')) {
      botResponse = "To complete your KYC, please provide:\n1. Aadhar Card\n2. PAN Card\n3. Recent Photograph\n\nYou can either upload the documents or we can help you complete the process through video KYC.";
    } else {
      botResponse = "I can help you with:\n• Insurance schemes\n• Loan information\n• KYC process\n\nWhat would you like to know more about?";
    }

    const botMessage = { text: botResponse, isBot: true };
    setMessages(prev => [...prev, botMessage]);

    // Speak the response
    try {
      await Speech.speak(botResponse, {
        language: selectedLanguage,
        pitch: 1,
        rate: 0.9,
      });
    } catch (error) {
      console.error('Speech synthesis error:', error);
    }
  };

  return (
    <>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setIsVisible(true)}
      >
        <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite">
          <Ionicons name="chatbubble-ellipses" size={30} color="white" />
        </Animatable.View>
      </TouchableOpacity>

      <Modal
        visible={isVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>GigMate Assistant</Text>
              <TouchableOpacity onPress={() => setIsVisible(false)}>
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>

            <View style={styles.languageSelector}>
              <TouchableOpacity
                style={[styles.langButton, selectedLanguage === 'en-IN' && styles.selectedLang]}
                onPress={() => setSelectedLanguage('en-IN')}
              >
                <Text>English</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.langButton, selectedLanguage === 'hi-IN' && styles.selectedLang]}
                onPress={() => setSelectedLanguage('hi-IN')}
              >
                <Text>हिंदी</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.langButton, selectedLanguage === 'ta-IN' && styles.selectedLang]}
                onPress={() => setSelectedLanguage('ta-IN')}
              >
                <Text>தமிழ்</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.messagesContainer}>
              {messages.map((message, index) => (
                <View
                  key={index}
                  style={[
                    styles.message,
                    message.isBot ? styles.botMessage : styles.userMessage,
                  ]}
                >
                  <Text style={styles.messageText}>{message.text}</Text>
                </View>
              ))}
            </ScrollView>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={inputText}
                onChangeText={setInputText}
                placeholder="Type your message..."
                onSubmitEditing={() => handleUserInput(inputText)}
              />
              <TouchableOpacity
                style={styles.sendButton}
                onPress={() => handleUserInput(inputText)}
              >
                <Ionicons name="send" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 80,
    backgroundColor: '#2ECC71',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: 2,
    borderColor: '#000',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    height: '80%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  languageSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  langButton: {
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedLang: {
    backgroundColor: '#2ECC71',
    borderColor: '#000',
  },
  messagesContainer: {
    flex: 1,
    marginBottom: 20,
  },
  message: {
    maxWidth: '80%',
    padding: 15,
    borderRadius: 20,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#000',
  },
  botMessage: {
    backgroundColor: '#E8F5E9',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 5,
  },
  userMessage: {
    backgroundColor: '#2ECC71',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 5,
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#2ECC71',
    padding: 10,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#000',
  },
});
