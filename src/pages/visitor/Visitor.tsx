/**
 * Visitor Page - Modern Public Equipment Catalog
 * Public equipment viewing page without authentication
 * Uses useEquipmentList hook with visitor mode enabled
 */

// import libraries
import {useLoaderData, Link} from "react-router-dom";
import {motion} from "framer-motion";

// import hooks and handlers
import {useEquipmentList} from "@/hooks/equipment/useEquipmentList";
import {createEquipmentSearchHandlers} from "@/handlers";

// import components
import EquipmentListView from "@/components/ui/equipment/EquipmentListView";
import {Button} from "@/components/ui/common/Button";
import {FadeInSection} from "@/components/ui/common/FadeInSection";

// import routes
import {ROUTES} from "@/api/config";

// import icons
import {Package, TrendingUp, LogIn, Sparkles} from "lucide-react";

const Visitor = () => {
  // Load initial data from route loader
  const initialData = useLoaderData();

  // Use headless hook with visitor mode enabled
  const {
    displayData,
    filters,
    setSearchTerm,
    setSearchStatus,
    setSearchOrder,
    statusOptions,
    sortOptions,
  } = useEquipmentList({
    initialData: initialData as any[],
  });

  // Create event handlers
  const searchHandlers = createEquipmentSearchHandlers(
    setSearchTerm,
    setSearchStatus,
    setSearchOrder
  );

  // Visitor mode has no borrow or detail view actions
  const handleViewDetails = (equipmentId: string) => {
    console.log("View details:", equipmentId);
    // Could navigate to a public detail page if needed
  };

  // Calculate stats
  const totalEquipment = displayData.length;
  const availableEquipment = displayData.filter(
    (item) => item.Status === "Available"
  ).length;

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <motion.header
        initial={{y: -100}}
        animate={{y: 0}}
        transition={{duration: 0.6, ease: "easeOut"}}
        className="bg-black text-white shadow-lg sticky top-0 z-50 border-b border-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{scale: 1.02}}
            >
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <Package className="text-black" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold">
                  Lend<span className="text-gray-400">Equip</span>
                </h1>
                <p className="text-xs text-gray-400">Equipment Catalog</p>
              </div>
            </motion.div>
            <Link to={ROUTES.LOGIN}>
              <motion.div whileHover={{scale: 1.05}} whileTap={{scale: 0.95}}>
                <Button
                  variant="primary"
                  size="lg"
                  className="flex items-center gap-2 bg-white text-black hover:bg-gray-100"
                >
                  <LogIn size={18} />
                  Login
                </Button>
              </motion.div>
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <div className="bg-black text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeInSection>
            <div className="text-center">
              <motion.div
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20"
                whileHover={{scale: 1.05}}
              >
                <Sparkles size={16} className="text-white" />
                <span className="text-sm font-medium">
                  Public Equipment Browser
                </span>
              </motion.div>
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                Browse Our
                <br />
                <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  Equipment Collection
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Explore our comprehensive collection of available equipment.
                <br />
                Login to start borrowing today.
              </p>
            </div>
          </FadeInSection>

          {/* Stats Cards */}
          <FadeInSection delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 max-w-3xl mx-auto">
              <motion.div
                whileHover={{scale: 1.05, y: -5}}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/30 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">
                      Total Equipment
                    </p>
                    <p className="text-5xl font-bold mt-2">{totalEquipment}</p>
                  </div>
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
                    <Package size={32} className="text-white" />
                  </div>
                </div>
              </motion.div>
              <motion.div
                whileHover={{scale: 1.05, y: -5}}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/30 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">
                      Available Now
                    </p>
                    <p className="text-5xl font-bold mt-2">
                      {availableEquipment}
                    </p>
                  </div>
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
                    <TrendingUp size={32} className="text-white" />
                  </div>
                </div>
              </motion.div>
            </div>
          </FadeInSection>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Main Content */}
      <FadeInSection delay={0.3}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <EquipmentListView
            equipmentList={displayData}
            searchTerm={filters.searchTerm}
            searchStatus={filters.searchStatus}
            searchOrder={filters.searchOrder}
            statusOptions={statusOptions}
            sortOptions={sortOptions}
            onSearchChange={searchHandlers.onSearchChange}
            onStatusChange={searchHandlers.onStatusChange}
            onSortChange={searchHandlers.onSortChange}
            onViewDetails={handleViewDetails}
            isRequest={false} // Hide borrow actions for visitors
            title=""
          />
        </div>
      </FadeInSection>

      {/* Footer CTA */}
      <div className="bg-black text-white border-t border-gray-800 mt-20 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <FadeInSection delay={0.2}>
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Borrowing?
            </h3>
            <p className="text-gray-400 text-lg mb-8">
              Login to access the full platform and start borrowing equipment
              today
            </p>
            <Link to={ROUTES.LOGIN}>
              <motion.div whileHover={{scale: 1.05}} whileTap={{scale: 0.95}}>
                <Button
                  variant="primary"
                  size="lg"
                  className="flex items-center gap-2 mx-auto bg-white text-black hover:bg-gray-100"
                >
                  <LogIn size={20} />
                  Login to Continue
                </Button>
              </motion.div>
            </Link>
          </FadeInSection>
        </div>
      </div>
    </div>
  );
};

export default Visitor;
