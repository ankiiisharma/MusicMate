import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="text-gray-700 mt-10 py-5 px-4">
      <hr className="border-gray-700 mb-4" />

      <div className="text-center space-y-2">
        <p className="text-sm">Made by Ankit Sharma</p>
        
        <div className="flex justify-center gap-6 text-xl">
          {/* GitHub */}
          <a href="https://github.com/ankiiisharma" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub className="hover:text-white" />
          </a>
          {/* LinkedIn */}
          <a href="https://linkedin.com/in/ankiiisharma" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin className="hover:text-white" />
          </a>
          {/* X (Twitter) */}
          <a href="https://twitter.com/heyankiii" target="_blank" rel="noopener noreferrer" aria-label="X">
            <FaTwitter className="hover:text-white" />
          </a>
        </div>

     
      </div>
    </footer>
  );
};

export default Footer;
