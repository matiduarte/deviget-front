<template>
  <nav class="sticky-header navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand" style="align-items: center">
      <div style="height: 40px; width: 40px; margin-left: 5px">
        <img src="../assets/reddit.png" alt="icon-reddit" width="100%" height="100%">
      </div>
      <h1 class="navbar-item">
        Deviget
      </h1>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
};
</script>

<style scoped>
  .navbar {
    background: #FF5700;
    box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 2px 9px 1px rgba(0, 0, 0, 0.12), 0 4px 2px -2px rgba(0, 0, 0, 0.2);
    color: #fff;
  }
  .navbar-item {
    color: #fff;
    font-weight: bold;
  }
  .sticky-header {
    position: sticky;
    top: 0;
    z-index: 3;
  }
</style>
