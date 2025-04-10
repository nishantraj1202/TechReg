import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NeoBrutalismCard from './components/NeoBrutalismCard';
import { useRouter } from 'expo-router';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';

export default function EarningsDetail() {
  const router = useRouter();

  const platforms = [
    {
      name: 'Zomato',
      earnings: 850.00,
      orders: 42,
      growth: 8.5,
    },
    {
      name: 'Swiggy',
      earnings: 720.50,
      orders: 35,
      growth: 5.2,
    },
    {
      name: 'Uber',
      earnings: 540.75,
      orders: 28,
      growth: -2.1,
    },
    {
      name: 'Ola',
      earnings: 338.75,
      orders: 15,
      growth: 12.4,
    },
  ];

  const expenses = [
    {
      category: 'Fuel',
      amount: 180.50,
    },
    {
      category: 'Vehicle Maintenance',
      amount: 120.00,
    },
    {
      category: 'Insurance',
      amount: 75.00,
    },
    {
      category: 'Phone Bill',
      amount: 45.00,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#4facfe', '#00f2fe']}
        style={styles.gradient}
      >
        <ScrollView style={styles.scrollView}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
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
              {platforms.map((platform, index) => (
                <View key={platform.name} style={styles.platformItem}>
                  <View style={styles.platformHeader}>
                    <Text style={styles.platformName}>{platform.name}</Text>
                    <Text style={styles.platformOrders}>{platform.orders} orders</Text>
                  </View>
                  <View style={styles.platformDetails}>
                    <Text style={styles.platformEarnings}>${platform.earnings.toFixed(2)}</Text>
                    <Text style={[
                      styles.platformGrowth,
                      { color: platform.growth >= 0 ? '#2ECC71' : '#E74C3C' }
                    ]}>
                      {platform.growth >= 0 ? '↑' : '↓'} {Math.abs(platform.growth)}%
                    </Text>
                  </View>
                </View>
              ))}
            </NeoBrutalismCard>
          </Animatable.View>

          <Animatable.View animation="fadeInUp" delay={400}>
            <NeoBrutalismCard style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>Expenses</Text>
              {expenses.map((expense, index) => (
                <View key={expense.category} style={styles.expenseItem}>
                  <Text style={styles.expenseCategory}>{expense.category}</Text>
                  <Text style={styles.expenseAmount}>-${expense.amount.toFixed(2)}</Text>
                </View>
              ))}
              <View style={styles.totalExpense}>
                <Text style={styles.totalExpenseText}>Total Expenses</Text>
                <Text style={styles.totalExpenseAmount}>
                  -${expenses.reduce((sum, exp) => sum + exp.amount, 0).toFixed(2)}
                </Text>
              </View>
            </NeoBrutalismCard>
          </Animatable.View>

          <Animatable.View animation="fadeInUp" delay={600}>
            <NeoBrutalismCard style={styles.netEarningsCard}>
              <Text style={styles.netEarningsTitle}>Net Earnings</Text>
              <Text style={styles.netEarningsAmount}>
                ${(2450 - expenses.reduce((sum, exp) => sum + exp.amount, 0)).toFixed(2)}
              </Text>
            </NeoBrutalismCard>
          </Animatable.View>
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
  platformItem: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
  },
  platformHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  platformName: {
    fontSize: 16,
    fontWeight: '600',
  },
  platformOrders: {
    fontSize: 14,
    color: '#666',
  },
  platformDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  platformEarnings: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2ECC71',
  },
  platformGrowth: {
    fontSize: 14,
    fontWeight: '600',
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  expenseCategory: {
    fontSize: 16,
    color: '#333',
  },
  expenseAmount: {
    fontSize: 16,
    color: '#E74C3C',
    fontWeight: '600',
  },
  totalExpense: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 2,
    borderTopColor: '#000',
  },
  totalExpenseText: {
    fontSize: 16,
    fontWeight: '700',
  },
  totalExpenseAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#E74C3C',
  },
  netEarningsCard: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#2ECC71',
  },
  netEarningsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 10,
  },
  netEarningsAmount: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
  },
});