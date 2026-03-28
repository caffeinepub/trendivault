import Array "mo:core/Array";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type ProductId = Nat;

  type Product = {
    id : ProductId;
    shortTitle : Text;
    title : Text;
    description : Text;
    price : Nat;
    mrp : Nat;
    discountPercent : Nat;
    cashfreeUrl : Text;
    externalLink : ?Text;
    imageHash : Text;
  };

  public type UserProfile = {
    name : Text;
  };

  module Product {
    public func compare(p1 : Product, p2 : Product) : Order.Order {
      Nat.compare(p1.id, p2.id);
    };
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  let products : [Product] = [
    {
      id = 0;
      shortTitle = "Amazon Cart Add Kerala";
      title = "Amazon Cart Add Service (Kerala Delivery) - CartBot";
      description = "Upgrade your Amazon shopping experience with CartBot! Our service automates the 'add to cart' process for products with limited, fast delivery to Kerala. Get the best deals on trending products.";
      price = 9900;
      mrp = 15900;
      discountPercent = 38;
      cashfreeUrl = "https://payments.cashfree.com/link/amazoncartaddkerala";
      externalLink = null;
      imageHash = "trendi-cartbot.webp";
    },
    {
      id = 1;
      shortTitle = "Temu Shopping Agent";
      title = "Temu Shopping Agent - China via India - NO BANNED Products";
      description = "Facilitates purchases from Temu (China) through Indian intermediaries, exclusively for items allowed into China (NO banned products). Ensures access to unique items with safe, legal delivery.";
      price = 1990;
      mrp = 4990;
      discountPercent = 60;
      cashfreeUrl = "https://payments.cashfree.com/link/temushoppingagent";
      externalLink = null;
      imageHash = "temu-shopping-agent.webp";
    },
    {
      id = 2;
      shortTitle = "AI Upscale (4K)";
      title = "AI Applied Upscaling (4K) - Automatic Purchase Order";
      description = "AI-powered service upscales your low-resolution images to 4K quality. Simply upload your original photo after payment for instant, digital enhancement with no physical product delivery.";
      price = 350;
      mrp = 500;
      discountPercent = 30;
      cashfreeUrl = "https://payments.cashfree.com/link/aiappliedupscaling4k";
      externalLink = null;
      imageHash = "upscaling-img.webp";
    },
    {
      id = 3;
      shortTitle = "Dunkin Donuts India Cashback";
      title = "Dunkin Donuts India Cashback - Rupee Reward";
      description = "Get Dunkin Donuts orders in India for just ₹1 with this cashback reward. Pay the full amount, and receive ₹999 cashback. Open to Indian mobile users (2 redemptions per person, legal compliance required).";
      price = 1;
      mrp = 1000;
      discountPercent = 99;
      cashfreeUrl = "https://payments.cashfree.com/link/dunkindonutsindiacashback";
      externalLink = null;
      imageHash = "dunkindonuts-india.webp";
    },
    {
      id = 4;
      shortTitle = "TrendiVault Digital Product Store";
      title = "TrendiVault Digital Product Store";
      description = "Secure multi-vendor digital product marketplace. Purchase and download crypto keys, software, videos and more. TrendiVault is resistant to censorship. No payment link for this listing.";
      price = 10;
      mrp = 10;
      discountPercent = 0;
      cashfreeUrl = "";
      externalLink = ?"/products/supreme/product-store";
      imageHash = "trendi-vault.webp";
    },
    {
      id = 5;
      shortTitle = "Free Canva Design Download";
      title = "Canva Design Download Service - Automated Purchase";
      description = "Download high-quality designs from Canva by sharing your publicly available projects. Only free Canva templates are accepted, with instant delivery upon payment. Legal compliance required to use this service.";
      price = 7;
      mrp = 15;
      discountPercent = 53;
      cashfreeUrl = "";
      externalLink = ?"/tools/supreme/free-design-download";
      imageHash = "free-canva-download.webp";
    },
    {
      id = 6;
      shortTitle = "Amazon UPI Trick";
      title = "Amazon UPI Savings Trick - Get 20₹ Cashback [5-500₹ Order]";
      description = "Browse discounted and trending Amazon products on our marketplace. Validate UPI transactions and receive cashback upon order verification. No payment link currently available for this product.";
      price = 50;
      mrp = 50;
      discountPercent = 0;
      cashfreeUrl = "";
      externalLink = ?"/ups/savings/amazon-upi-trick";
      imageHash = "amazon-upi-trick-upload.webp";
    },
  ];

  // Returns catalog of all digital products
  // Public access - no authorization needed (guests can view products)
  public query ({ caller }) func getProducts() : async [Product] {
    products.sort();
  };

  // Get the caller's own user profile
  // Requires user role
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  // Get another user's profile
  // Users can only view their own profile, admins can view any profile
  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  // Save the caller's user profile
  // Requires user role
  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };
};
