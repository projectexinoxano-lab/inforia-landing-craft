const VideoSection = () => {
  return (
    <section className="py-16 px-6 bg-muted/30">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-2xl shadow-card border-4 border-inforia-cream">
            <div className="aspect-video bg-gradient-to-br from-inforia-green/10 to-inforia-gold/10 rounded-xl flex items-center justify-center relative overflow-hidden">
              {/* Placeholder content */}
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-inforia-green/20 rounded-full flex items-center justify-center mx-auto">
                  <div className="w-0 h-0 border-l-8 border-l-inforia-green border-y-6 border-y-transparent ml-1"></div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-heading font-semibold text-xl text-inforia-green">
                    Próximamente
                  </h3>
                  <p className="font-sans text-muted-foreground">
                    Vídeo de demostración de INFORIA
                  </p>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-4 left-4 w-12 h-12 border-2 border-inforia-gold/30 rounded-full"></div>
              <div className="absolute bottom-4 right-4 w-8 h-8 bg-inforia-green/20 rounded-full"></div>
              <div className="absolute top-1/2 right-8 w-6 h-6 bg-inforia-gold/30 rounded-full transform -translate-y-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;