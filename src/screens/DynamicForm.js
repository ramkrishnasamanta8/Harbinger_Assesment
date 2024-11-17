import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateField, submitForm } from '../store/slices/formSlice';
import { Picker } from '@react-native-picker/picker';

const DynamicForm = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form.formData);
  const [errors, setErrors] = useState({});

  const fields = [
    {
      id: "name",
      label: "Full Name",
      fieldType: "text",
      placeholder: "Enter your full name",
      validation: {
        required: true,
        minLength: 3,
        maxLength: 50,
      },
    },
    {
      id: "email",
      label: "Email",
      fieldType: "email",
      placeholder: "Enter your email address",
      validation: {
        required: true,
        pattern: "^\\S+@\\S+\\.\\S+$",
      },
    },
    {
      id: "gender",
      label: "Gender",
      fieldType: "singleSelect",
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Other", value: "other" },
      ],
      validation: {
        required: true,
      },
    },
    {
      id: "hobbies",
      label: "Hobbies",
      fieldType: "multiSelect",
      options: [
        { label: "Reading", value: "reading" },
        { label: "Traveling", value: "traveling" },
        { label: "Cooking", value: "cooking" },
        { label: "Sports", value: "sports" },
      ],
    },
    {
      id: "country",
      label: "Country",
      fieldType: "dropdown",
      options: [
        { label: "United States", value: "us" },
        { label: "India", value: "in" },
        { label: "Canada", value: "ca" },
        { label: "Australia", value: "au" },
      ],
      validation: {
        required: true,
      },
    },
  ];

  const validateField = (field, value) => {
    const { required, minLength, maxLength, pattern } = field.validation || {};
    if (required && !value) return `${field.label} is required.`;
    if (minLength && value.length < minLength) return `${field.label} must be at least ${minLength} characters.`;
    if (maxLength && value.length > maxLength) return `${field.label} must not exceed ${maxLength} characters.`;
    if (pattern && !new RegExp(pattern).test(value)) return `${field.label} is invalid.`;
    return null;
  };

  const handleInputChange = (fieldId, value) => {
    dispatch(updateField({ fieldId, value }));
    const field = fields.find((f) => f.id === fieldId);
    const error = validateField(field, value);
    setErrors((prev) => ({ ...prev, [fieldId]: error }));
  };

  const handleSubmit = () => {
    const newErrors = {};
    fields.forEach((field) => {
      const error = validateField(field, formData[field.id]);
      if (error) newErrors[field.id] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      Alert.alert('Validation Error', 'Please correct the errors in the form.');
    } else {
      dispatch(submitForm());
      Alert.alert('Success', 'Form submitted successfully.');
    }
  };

  const renderField = (field) => {
    switch (field.fieldType) {
      case 'text':
      case 'email':
        return (
          <TextInput
            key={field.id}
            style={styles.input}
            placeholder={field.placeholder}
            value={formData[field.id] || ''}
            onChangeText={(value) => handleInputChange(field.id, value)}
          />
        );
      case 'singleSelect':
        return (
          <View key={field.id}>
            <Picker
              selectedValue={formData[field.id] || ''}
              onValueChange={(value) => handleInputChange(field.id, value)}
            >
              <Picker.Item label="Select an option" value="" />
              {field.options.map((option) => (
                <Picker.Item key={option.value} label={option.label} value={option.value} />
              ))}
            </Picker>
          </View>
        );
      case 'multiSelect':
        return (
          <View key={field.id}>
            {field.options.map((option) => (
              <View key={option.value} style={styles.checkboxContainer}>
                <Text>{option.label}</Text>
                <Button
                  title={formData[field.id]?.includes(option.value) ? 'Selected' : 'Select'}
                  onPress={() => {
                    const currentValues = formData[field.id] || [];
                    const newValue = currentValues.includes(option.value)
                      ? currentValues.filter((v) => v !== option.value)
                      : [...currentValues, option.value];
                    handleInputChange(field.id, newValue);
                  }}
                />
              </View>
            ))}
          </View>
        );
      case 'dropdown':
        return (
          <Picker
            key={field.id}
            selectedValue={formData[field.id] || ''}
            onValueChange={(value) => handleInputChange(field.id, value)}
          >
            <Picker.Item label="Select a country" value="" />
            {field.options.map((option) => (
              <Picker.Item key={option.value} label={option.label} value={option.value} />
            ))}
          </Picker>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {fields.map((field) => (
        <View key={field.id} style={styles.fieldContainer}>
          <Text style={styles.label}>{field.label}</Text>
          {renderField(field)}
          {errors[field.id] && <Text style={styles.error}>{errors[field.id]}</Text>}
        </View>
      ))}
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  fieldContainer: { marginBottom: 16 },
  label: { fontWeight: 'bold', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 4 },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  error: { color: 'red', marginTop: 4 },
});

export default DynamicForm;
