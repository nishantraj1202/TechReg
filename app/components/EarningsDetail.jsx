import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { VictoryPie, VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { format } from 'date-fns';
import NeoBrutalismCard from './NeoBrutalismCard';

const { width } = Dimensions.get('window');

const PLATFORMS = ['Zomato', 'Swiggy', 'Uber', 'Ola'];
const EXPENSE_CATEGORIES = ['Petrol', 'Bike Repair', 'Other'];

export default function EarningsDetail({ onClose }) {
  const [monthlyGoal, setMonthlyGoal] = useState(20000);
  const [monthlyEarnings, setMonthlyEarnings] = useState(0);
  const [platformEarnings, setPlatformEarnings] = useState({});
  const [expenses, setExpenses] = useState({});
  const [otherExpenseNote, setOtherExpenseNote] = useState('');
  const [showGoalInput, setShowGoalInput] = useState(false);
  const [newGoal, setNewGoal] = useState('');

  React.useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('earningsData');
      if (storedData) {
        const data = JSON.parse(storedData);
        setMonthlyGoal(data.monthlyGoal || 20000);
        setMonthlyEarnings(data.monthlyEarnings || 0);
        setPlatformEarnings(data.platformEarnings || {});
        setExpenses(data.expenses || {});
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const saveData = async () => {
    try {
      const data = {
        monthlyGoal,
        monthlyEarnings,
        platformEarnings,
        expenses,
      };
      await AsyncStorage.setItem('earningsData', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const updatePlatformEarning = (platform, amount) => {
    const newEarnings = {
      ...platformEarnings,
      [platform]: parseFloat(amount) || 0,
    };
    setPlatformEarnings(newEarnings);
    updateMonthlyEarnings(newEarnings);
  };

  const updateExpense = (category, amount) => {
    setExpenses({
      ...expenses,
      [category]: parseFloat(amount) || 0,
    });
  };

  const updateMonthlyEarnings = (newEarnings) => {
    const total = Object.values(newEarnings).reduce((sum, val) => sum + val, 0);
    setMonthlyEarnings(total);
  };

  const getTotalExpenses = () => {
    return Object.values(expenses).reduce((sum, val) => sum + val, 0);
  };

  const getNetEarnings = () => {
    const totalEarnings = Object.values(platformEarnings).reduce((sum, val) => sum + val, 0);
    const totalExpenses = getTotalExpenses();
    return totalEarnings - totalExpenses;
  };

  const getProgressPercentage = () => {
    return (monthlyEarnings / monthlyGoal) * 100;
  };

  const updateMonthlyGoal = () => {
    const goal = parseFloat(newGoal);
    if (goal > 0) {
      setMonthlyGoal(goal);
      setShowGoalInput(false);
      setNewGoal('');
      saveData();
    }
  };

  const chartData = PLATFORMS.map(platform => ({
    x: platform,
    y: platformEarnings[platform] || 0,
  }));

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#4facfe', '#00f2fe']}
        style={styles.gradient}
      >
        <ScrollView style={styles.scrollView}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={onClose}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>

          <Animatable.View animation="fadeInDown">
            <NeoBrutalismCard style={styles.totalCard}>
              <Text style={styles.totalTitle}>Total Earnings</Text>
              <Text style={styles.totalAmount}>$2,450.00</Text>
              <Text style={styles.period}>This Week</Text>
            </NeoBrutalismCard>
          </Animatable.View>

          <Animatable.View animation="fadeInUp" delay={200}>
            <NeoBrutalismCard style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>Platform Earnings</Text>
              {PLATFORMS.map((platform) => (
                <View key={platform} style={styles.inputRow}>
                  <Text style={styles.inputLabel}>{platform}</Text>
                  <TextInput
                    style={styles.input}
                    value={platformEarnings[platform]?.toString() || ''}
                    onChangeText={(value) => updatePlatformEarning(platform, value)}
                    keyboardType="numeric"
                    placeholder="0.00"
                  />
                </View>
              ))}
            </NeoBrutalismCard>
          </Animatable.View>

          <Animatable.View animation="fadeInUp" delay={400}>
            <NeoBrutalismCard style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>Expenses</Text>
              {EXPENSE_CATEGORIES.map((category) => (
                <View key={category} style={styles.inputRow}>
                  <Text style={styles.inputLabel}>{category}</Text>
                  <TextInput
                    style={styles.input}
                    value={expenses[category]?.toString() || ''}
                    onChangeText={(value) => updateExpense(category, value)}
                    keyboardType="numeric"
                    placeholder="0.00"
                  />
                </View>
              ))}
              {expenses['Other'] > 0 && (
                <TextInput
                  style={styles.noteInput}
                  value={otherExpenseNote}
                  onChangeText={setOtherExpenseNote}
                  placeholder="Note for other expense"
                />
              )}
            </NeoBrutalismCard>
          </Animatable.View>

          <Animatable.View animation="fadeInUp" delay={600}>
            <NeoBrutalismCard style={styles.summaryCard}>
              <Text style={styles.sectionTitle}>Today's Summary</Text>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Total Earnings:</Text>
                <Text style={styles.summaryAmount}>₹{Object.values(platformEarnings).reduce((sum, val) => sum + val, 0).toFixed(2)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Total Expenses:</Text>
                <Text style={[styles.summaryAmount, { color: '#e74c3c' }]}>₹{getTotalExpenses().toFixed(2)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Net Earnings:</Text>
                <Text style={[styles.summaryAmount, { color: getNetEarnings() >= 0 ? '#2ecc71' : '#e74c3c' }]}>
                  ₹{getNetEarnings().toFixed(2)}
                </Text>
              </View>
            </NeoBrutalismCard>
          </Animatable.View>

          <Animatable.View animation="fadeInUp" delay={700}>
            <NeoBrutalismCard style={styles.chartCard}>
              <Text style={styles.sectionTitle}>Earnings Distribution</Text>
              <VictoryPie
                data={chartData}
                width={width - 80}
                height={200}
                colorScale={['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4']}
                innerRadius={30}
                labelRadius={({ innerRadius }) => (innerRadius + 80)}
                style={{ labels: { fill: 'black', fontSize: 12, fontWeight: 'bold' } }}
              />
            </NeoBrutalismCard>
          </Animatable.View>

          <TouchableOpacity style={styles.saveButton} onPress={saveData}>
            <Text style={styles.saveButtonText}>Save Today's Data</Text>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    padding: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  totalCard: {
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  totalTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  totalAmount: {
    fontSize: 36,
    fontWeight: '800',
    color: '#2ECC71',
    marginBottom: 5,
  },
  period: {
    fontSize: 14,
    color: '#666',
  },
  sectionCard: {
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 15,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#000',
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2c3e50',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
    width: 120,
    textAlign: 'right',
  },
  noteInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  summaryLabel: {
    fontSize: 16,
    color: '#2c3e50',
  },
  summaryAmount: {
    fontSize: 18,
    fontWeight: '700',
  },
  chartCard: {
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#2ecc71',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 16,
    borderWidth: 2,
    borderColor: '#000',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
});