import { Calendar, Users, Clock, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const NoBookings = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] px-4">
      {/* Animated Icon Container */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-2xl opacity-20 animate-pulse"></div>
        <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-full shadow-lg">
          <Calendar size={80} className="text-blue-600" strokeWidth={1.5} />
        </div>
        {/* Decorative Elements */}
        <div className="absolute -top-2 -right-2 bg-yellow-400 p-2 rounded-full shadow-lg animate-bounce">
          <Sparkles size={20} className="text-white" />
        </div>
      </div>

      {/* Main Content */}
      <div className="text-center max-w-md space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          Your Schedule is Clear
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          No upcoming consultations at the moment. Your calendar is ready for
          new appointments!
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-2 gap-4 mt-10 mb-8 max-w-2xl w-full">
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Users size={24} className="text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">
                Connect with Clients
              </h3>
              <p className="text-sm text-gray-600">
                Build your client base and grow your practice
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start gap-3">
            <div className="bg-purple-100 p-2 rounded-lg">
              <Clock size={24} className="text-purple-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">
                Flexible Scheduling
              </h3>
              <p className="text-sm text-gray-600">
                Manage your time on your own terms
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <Link href="/lawyers">
          <button className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2">
            Explore Lawyers
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </Link>
      </div>

      {/* Bottom Hint */}
      <p className="text-sm text-gray-500 mt-8 text-center">
        💡 Tip: Keep your availability updated to receive more bookings
      </p>
    </div>
  );
};

export default NoBookings;
