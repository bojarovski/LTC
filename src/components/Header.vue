<template>
  <div>
    <div class="top-menu">
      <img
        class="logo-image"
        alt="Company Logo"
        src="../assets/imgs/logo.png"
      />
      <router-link
        class="profile-link"
        to="/profile"
        aria-label="Go to Profile"
      >
        <img
          class="profile-image"
          src="../assets/profile_icon.png"
          alt="Profile Icon"
        />
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopMenu",
};
</script>

<style scoped>
.top-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 150px;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.3);
  background-color: white;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-image {
  height: auto;
  max-height: 80px;
  object-fit: contain;
}

.profile-link {
  margin-right: 20px;
}

.profile-image {
  height: 45px;
  width: 45px;
  border-radius: 50%;
}

/* Responsive Styling */
@media (max-width: 768px) {
  .top-menu {
    height: 100px;
    padding: 10px;
  }

  .logo-image {
    max-height: 60px;
  }

  .profile-image {
    height: 35px;
    width: 35px;
  }
}
</style>
