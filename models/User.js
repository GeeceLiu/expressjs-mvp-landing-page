/* jshint indent: 2 */
'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
   // Twitter identity  
    twitterId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    twitterToken: {
      type: DataTypes.STRING,
      allowNull: true
    },
    twitterDisplayName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    twitterUsername: {
      type: DataTypes.STRING,
      allowNull: true
    },

    // Google identity
    googleId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    googleAccessToken: {
      type: DataTypes.STRING,
      allowNull: true
    },
    googleRefreshToken: {
      type: DataTypes.STRING,
      allowNull: true
    },
    googleDisplayName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    googleUsername: {
      type: DataTypes.STRING,
      allowNull: true
    },

    // Facebook identity
    facebookId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    facebookAccessToken: {
      type: DataTypes.STRING,
      allowNull: true
    },
    facebookRefreshToken: {
      type: DataTypes.STRING,
      allowNull: true
    },
    facebookDisplayName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    facebookUsername: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // Stripe Subscription
    stripe_CustomerId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    stripe_SubscriptionId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_customer: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      default: false,
    }
  });

  User.associate = function(models) {
    User.belongsTo(models.Plan);
    User.belongsToMany(models.Product, { through: "PurchasedProduct", as: "Products", foreignKey: "UserId", otherKey: "ProductId"  });
  }
  return User;
}