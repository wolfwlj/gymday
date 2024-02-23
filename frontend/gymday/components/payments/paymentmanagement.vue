<script setup>
import usePaymentStore from '~/stores/payments';

const paymentstore = usePaymentStore()
</script>

<template>
  <div>
    <h1>Payment Management</h1>

    <button @click="paymentstore.TestAccountConnect()">Test knop!</button>
  </div>
</template>
