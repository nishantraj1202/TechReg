import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import NeoBrutalismCard from '../components/NeoBrutalismCard';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';

export default function SafetyScreen() {
  return (
    <LinearGradient
    
      colors={['#808080', '#9f6060']}
      style={styles.container}
    >
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <NeoBrutalismCard style={[styles.card, styles.emergencyCard]}>
        <TouchableOpacity style={styles.emergencyButton}>
          <Text style={styles.emergencyButtonText}>🚨 EMERGENCY SOS</Text>
        </TouchableOpacity>
      </NeoBrutalismCard>

      <NeoBrutalismCard style={styles.card}>
        <Text style={styles.title}>Safety Status</Text>
        <Animatable.View style={styles.statusItem} animation= "bounceIn" duration={800}  >
          <Text style={styles.statusLabel}>Location Sharing</Text>
          <Text style={styles.statusValue}>Active ✅</Text>
        </Animatable.View>
        <Animatable.View style={styles.statusItem} animation="bounceIn" duration={800}>
          <Text style={styles.statusLabel}>Trusted Contacts</Text>
          <Text style={styles.statusValue}>3 Set ✅</Text>
        </Animatable.View>
      </NeoBrutalismCard>

      <NeoBrutalismCard style={styles.card}>
        <Text style={styles.title}>Quick Actions</Text>
        <Animatable.View style={styles.actionsList} animation="bounceIn" duration={700}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Share Location 📍</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Call Support 📞</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Report Issue ⚠️</Text>
          </TouchableOpacity>
        </Animatable.View>
      </NeoBrutalismCard>

      <NeoBrutalismCard style={styles.card}>
        <Text style={styles.title}>Safety Tips</Text>
        <Animatable.View style={styles.tipsList} animation="bounceIn"duration={700}>
          <View style={styles.tipItem}>
            <Text style={styles.tipTitle}>Trust Your Instincts</Text>
            <Text style={styles.tipContent}>
              If a situation feels unsafe, it's okay to cancel and leave.
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipTitle}>Stay Connected</Text>
            <Text style={styles.tipContent}>
              Keep your phone charged and within reach at all times.
            </Text>
          </View>
        </Animatable.View>
      </NeoBrutalismCard>
    </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
    padding: 20,
  },
  emergencyCard: {
    backgroundColor: '#FFE5E5',
  },
  emergencyButton: {
    backgroundColor: '#FF4444',
    padding: 20,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: '#000',
    alignItems: 'center',
  },
  emergencyButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  statusItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#000',
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  statusValue: {
    fontSize: 16,
  },
  actionsList: {
    gap: 12,
  },
  actionButton: {
    backgroundColor: '#E5FFE5',
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tipsList: {
    gap: 12,
  },
  tipItem: {
    backgroundColor: '#E5E5FF',
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#000',
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  tipContent: {
    fontSize: 14,
    color: 'green',
  },
});